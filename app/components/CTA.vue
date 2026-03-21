<template>
  <section ref="rootEl" data-momentum-hover-init class="bg-dark-600 py-36 overflow-x-hidden">
    <div ref="marqueeEl" data-radial-text-marquee-init data-radial-text-marquee-speed="2" data-radial-text-marquee-radius="8" data-radial-text-marquee-spacer="-" data-radial-text-marquee-spacer-color="#F5FF00" class="radial-text-marquee text-white">
      <div data-radial-text-marquee-text class="radial-text-marquee__text">Branding</div>
      <div data-radial-text-marquee-text class="radial-text-marquee__text">Web</div>
      <div data-radial-text-marquee-text class="radial-text-marquee__text">Video</div>
      <div data-radial-text-marquee-text class="radial-text-marquee__text">Foto</div>
    </div>
    <LayoutTheContainer>
      <div class="flex items-center justify-center flex-col">
        <h2 class="text-5xl uppercase md:normal-case max-w-4xl md:text-8xl font-bold text-center text-white mt-8 md:leading-[5.8rem] z-10 md:-tracking-[4px]">Wil je dat je <br class="hidden md:block" /> merk ineens <br class="hidden md:block" /><span data-momentum-hover-element class="inline-block"><span data-momentum-hover-target class="bg-primary-600 px-4 md:px-8 text-dark-600 inline-block leading-none align-middle pb-3 md:pb-4 mt-2.5 md:mt-4">wel</span></span> <span data-momentum-hover-element class="inline-block"><span data-momentum-hover-target class="bg-[#FF5421] px-4 md:px-8 text-white inline-block leading-none align-middle pb-3 md:pb-4 mt-2.5 md:mt-4">opvalt?</span></span></h2>
          <p class=" mt-7 text-white text-[22px] font-semibold text-center max-w-2xl font-family-helvetica -tracking-[1px] ">Ik geloof in een wereld waar sterke websites, cinematische video, krachtige fotografie en consistente branding je merk laten opvallen zoals het verdient.</p>
          <IconButton label="Naar aanmeldformulier" href="/contact" class="mt-10" />
      </div>
    </LayoutTheContainer>
  </section>
</template>

<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

type CleanupFn = () => void

const rootEl = ref<HTMLElement | null>(null)
const marqueeEl = ref<HTMLElement | null>(null)
const cleanupFns: CleanupFn[] = []

onMounted(async () => {
  // Dynamic import to keep things SSR-safe and avoid occasional hydration/runtime races.
  const { gsap } = await import('gsap')
  const scrollTriggerMod: any = await import('gsap/ScrollTrigger')
  const ScrollTrigger = scrollTriggerMod.ScrollTrigger || scrollTriggerMod.default
  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger)

  await nextTick()
  // One extra frame so layout/font metrics are stable.
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

  const radial = initRadialTextMarquee(marqueeEl.value, gsap)
  if (radial?.cleanup) cleanupFns.push(radial.cleanup)

  const hoverCleanup = initMomentumBasedHover(rootEl.value, gsap)
  if (hoverCleanup) cleanupFns.push(hoverCleanup)

  if (ScrollTrigger && radial) {
    const scrollCleanup = initMarqueeScrollSpeed(marqueeEl.value, gsap, ScrollTrigger, radial)
    if (scrollCleanup) cleanupFns.push(scrollCleanup)
  }
})

onBeforeUnmount(() => {
  cleanupFns.forEach((fn) => fn())
})

function initRadialTextMarquee(wrap: HTMLElement | null, gsap: any) {
  if (!wrap) return null
  if (wrap.getAttribute('data-radial-text-marquee-init') === 'initialized') return null

  const textElFirst = wrap.querySelector('[data-radial-text-marquee-text]') as HTMLElement | null
  if (!textElFirst) return null

  const ns = 'http://www.w3.org/2000/svg'
  const xns = 'http://www.w3.org/1999/xlink'
  const prm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isSafari = (() => {
    const ua = navigator.userAgent
    return /Safari/i.test(ua) && !/Chrome|Chromium|Edg|OPR/i.test(ua)
  })()

  const clamp = (n: any, a: number, b: number) => Math.min(b, Math.max(a, Number(n) || 0))

  const speedMul = () => {
    const w = window.innerWidth || 2000
    const t = clamp((w - 250) / (2000 - 250), 0, 1)
    return 0.5 + t * (1 - 0.5)
  }

  const lsToPx = (ls: any, fs: number) => {
    if (!ls || ls === 'normal') return 0
    if (ls.endsWith('px')) return parseFloat(ls) || 0
    if (ls.endsWith('em')) return (parseFloat(ls) || 0) * fs
    if (ls.endsWith('rem')) {
      const root = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
      return (parseFloat(ls) || 0) * root
    }
    const n = parseFloat(ls)
    return Number.isFinite(n) ? n : 0
  }

  const syncType = (fromEl: Element, svgText: Element, svgTextPath: Element | null) => {
    const s = getComputedStyle(fromEl)
    const fsPx = parseFloat(s.fontSize) || 16
    const lsPx = lsToPx(s.letterSpacing, fsPx)

    svgText.setAttribute('font-family', s.fontFamily)
    svgText.setAttribute('font-size', s.fontSize)
    svgText.setAttribute('font-weight', s.fontWeight)
    svgText.setAttribute('dominant-baseline', 'alphabetic')
    svgText.setAttribute('text-rendering', 'geometricPrecision')
    svgText.setAttribute('fill', s.color)

    svgText.setAttribute('letter-spacing', `${lsPx}px`)
    svgText.setAttribute('font-kerning', 'none')
    svgText.setAttribute('font-feature-settings', '"kern" 0, "liga" 0, "clig" 0')

    if (svgTextPath) svgTextPath.setAttribute('letter-spacing', `${lsPx}px`)

    return { fsPx, lsPx, ff: s.fontFamily, fw: s.fontWeight, fz: s.fontSize }
  }

  const tspan = (tp: Element, v: string, fill?: string | null, lsPx?: number | null) => {
    const t = document.createElementNS(ns, 'tspan')
    t.textContent = v
    if (lsPx != null) t.setAttribute('letter-spacing', `${lsPx}px`)
    if (fill) {
      t.setAttribute('fill', fill)
      ;(t as any).style.fill = fill
    }
    tp.appendChild(t)
  }

  const buildRun = (
    tp: Element,
    words: string[],
    spacer: string,
    spacerColor: string | null,
    pad: string,
    reps: number,
    lsPx: number
  ) => {
    tp.textContent = ''
    for (let i = 0; i < reps; i++) {
      for (let w = 0; w < words.length; w++) {
        const word = words[w] || ''
        tspan(tp, word, null, lsPx)
        tspan(tp, pad, null, lsPx)
        tspan(tp, spacer, spacerColor, lsPx)
        tspan(tp, pad, null, lsPx)
      }
    }
  }

  const circleR = (half: number, level01: number) => {
    if (level01 <= 0) return half * 200
    const inv = 1 - level01
    return half * (1.01 + inv * inv * 16.99)
  }

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const measureLS = (str: string, fontCss: string, lsPx: number) => {
    if (!ctx) return 0
    ctx.font = fontCss
    const txt = (str || '').replace(/\u00A0/g, ' ')
    const w = ctx.measureText(txt).width || 0
    const glyphs = Array.from(txt).length
    return w + Math.max(glyphs - 1, 0) * (lsPx || 0)
  }

  const makeSvg = () => {
    const svg = document.createElementNS(ns, 'svg')
    const defs = document.createElementNS(ns, 'defs')
    const g = document.createElementNS(ns, 'g')
    const path = document.createElementNS(ns, 'path')
    const text = document.createElementNS(ns, 'text')
    const tp = document.createElementNS(ns, 'textPath')
    const id = `rtm-${Math.random().toString(16).slice(2)}`

    svg.setAttribute('xmlns', ns)
    svg.setAttribute('xmlns:xlink', xns)
    Object.assign(svg.style, {
      position: 'absolute',
      top: 0,
      left: 0,
      overflow: 'visible',
      pointerEvents: 'none',
      display: 'block'
    })
    svg.setAttribute('aria-hidden', 'true')
    svg.setAttribute('focusable', 'false')

    path.setAttribute('id', id)
    path.setAttribute('fill', 'none')
    path.setAttribute('stroke', 'none')

    tp.setAttributeNS(xns, 'xlink:href', `#${id}`)
    tp.setAttribute('text-anchor', 'start')
    tp.setAttribute('startOffset', '0px')

    text.appendChild(tp)
    defs.appendChild(path)
    svg.appendChild(defs)
    g.appendChild(path)
    g.appendChild(text)
    svg.appendChild(g)
    wrap.appendChild(svg)

    const textEls = wrap.querySelectorAll('[data-radial-text-marquee-text]')
    textEls.forEach((t) => ((t as HTMLElement).style.opacity = '0'))

    return { svg, g, path, text, tp, textEls }
  }

  const st: any = {
    ...(makeSvg()),
    tw: null,
    px: { x: 0 },
    inView: true,
    raf: 0,
    qs: null,
    scrollBoost: 1
  }

  const setPlaying = (play: boolean) => {
    st.inView = play
    if (!st.tw) return
    if (prm) return st.tw.pause()
    play ? st.tw.play() : st.tw.pause()
  }

  let io: IntersectionObserver | null = null
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver((e) => setPlaying(!!(e[0] && e[0].isIntersecting)), { threshold: 0 })
    io.observe(wrap)
  }

  const rebuild = () => {
    const textEls: NodeListOf<Element> = st.textEls || wrap.querySelectorAll('[data-radial-text-marquee-text]')
    const spacer = wrap.getAttribute('data-radial-text-marquee-spacer') || '•'
    const spacerColor = wrap.getAttribute('data-radial-text-marquee-spacer-color') || null
    const baseText = Array.from(textEls)
      .map((el) => (el.textContent || '').trim())
      .filter(Boolean)
      .join(` ${spacer} `)
    if (!baseText) return

    const speed = clamp(wrap.getAttribute('data-radial-text-marquee-speed') || 4, 0.1, 200)
    const speedPx = Math.max(speed * 100 * speedMul(), 1)

    const radiusLevel = clamp(wrap.getAttribute('data-radial-text-marquee-radius') || 10, 0, 10)
    const level01 = radiusLevel / 10

    const padCount = clamp(wrap.getAttribute('data-radial-text-marquee-spacer-padding') || 1, 0, 20)
    const pad = '\u00A0'.repeat(padCount)

    const typo = syncType(textElFirst, st.text, st.tp)

    const wrapW = Math.max(wrap.clientWidth || 1, 1)
    const wrapH = Math.max(wrap.clientHeight || textElFirst.offsetHeight || 1, 1)
    const bleed = typo.fsPx * 2

    const w = wrapW + bleed * 2
    const h = wrapH

    Object.assign(st.svg.style, { width: `${w}px`, height: `${h}px`, left: `${-bleed}px` })
    st.svg.setAttribute('width', `${w}`)
    st.svg.setAttribute('height', `${h}`)
    st.svg.setAttribute('viewBox', `0 0 ${w} ${h}`)

    const half = w / 2
    const r = level01 <= 0.0001 ? half * 200 : Math.max(circleR(half, level01), half + 0.001)
    const under = Math.max(r * r - half * half, 0)
    const y = Math.max(r - Math.sqrt(under), 0)

    st.path.setAttribute('d', level01 <= 0.0001 ? `M 0 ${y} L ${w} ${y}` : `M 0 ${y} A ${r} ${r} 0 0 1 ${w} ${y}`)
    st.text.setAttribute('x', '0')
    st.text.setAttribute('y', `${y}`)
    st.g.setAttribute('transform', `translate(0 ${typo.fsPx})`)

    cancelAnimationFrame(st.raf)
    st.raf = requestAnimationFrame(() => {
      const fontCss = `${typo.fw} ${typo.fz} ${typo.ff}`
      const words = Array.from(textEls).map((el) => (el.textContent || '').trim()).filter(Boolean) as string[]
      let loopLen = words.reduce((acc, w) => {
        return (
          acc +
          measureLS(w, fontCss, typo.lsPx) +
          measureLS(pad, fontCss, typo.lsPx) +
          measureLS(spacer, fontCss, typo.lsPx) +
          measureLS(pad, fontCss, typo.lsPx)
        )
      }, 0)

      loopLen = Math.max(loopLen || 0, 1)

      const pathLen = st.path.getTotalLength ? st.path.getTotalLength() : wrapW
      const targetCover = Math.max(pathLen * 4, wrapW * 8)
      const reps = clamp(Math.ceil(targetCover / loopLen) + 6, 6, 600)
      buildRun(st.tp, words, spacer, spacerColor, pad, reps, typo.lsPx)

      if (!isSafari) {
        const fullLen = st.tp.getComputedTextLength()
        if (Number.isFinite(fullLen) && fullLen > 0) {
          const perUnit = fullLen / reps
          if (Number.isFinite(perUnit) && perUnit > 0) loopLen = perUnit
        }
      }

      loopLen = Math.max(loopLen, 1)

      if (st.tw) st.tw.kill()
      st.tw = null
      if (prm) return

      st.qs = gsap && gsap.quickSetter ? gsap.quickSetter(st.tp, 'attr') : null

      const setOffset = (v: any) => {
        const val = `${v.toFixed(3)}px`
        if (st.qs) st.qs({ startOffset: val })
        else st.tp.setAttribute('startOffset', val)
      }

      st.px.x = 0
      st.tw = gsap.to(st.px, {
        x: loopLen,
        duration: loopLen / speedPx,
        ease: 'none',
        repeat: -1,
        onUpdate: () => {
          const x = ((st.px.x % loopLen) + loopLen) % loopLen
          setOffset(-x)
        }
      })

      st.tw.timeScale(st.scrollBoost || 1)
      setPlaying(st.inView)
    })
  }

  const schedule = (() => {
    let raf = 0
    return () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(rebuild)
    }
  })()

  // mark initialized once we have the SVG inserted
  wrap.setAttribute('data-radial-text-marquee-init', 'initialized')

  // Initial attempt + retries when fonts load.
  try {
    rebuild()
  } catch {
    // Fallback: show the original text if something goes wrong.
    const textEls = wrap.querySelectorAll('[data-radial-text-marquee-text]')
    textEls.forEach((t) => ((t as HTMLElement).style.opacity = '1'))
  }

  if (document.fonts && (document.fonts as any).ready) (document.fonts as any).ready.then(schedule).catch(() => {})
  else setTimeout(schedule, 150)

  let ro: ResizeObserver | null = null
  const onResize = () => schedule()
  if (window.ResizeObserver) {
    ro = new ResizeObserver(schedule)
    ro.observe(wrap)
    const textEls: NodeListOf<Element> = st.textEls || wrap.querySelectorAll('[data-radial-text-marquee-text]')
    textEls.forEach((te) => ro!.observe(te))
  } else {
    window.addEventListener('resize', onResize)
  }

  return {
    st,
    setScrollBoost: (boost: number) => {
      st.scrollBoost = boost
      if (st.tw) st.tw.timeScale(boost)
    },
    cleanup: () => {
      if (io) io.disconnect()
      if (ro) ro.disconnect()
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(st.raf)
      if (st.tw) st.tw.kill()
      if (st.svg && st.svg.parentNode) st.svg.parentNode.removeChild(st.svg)
      wrap.removeAttribute('data-radial-text-marquee-init')
    }
  }
}

function initMomentumBasedHover(root: HTMLElement | null, gsap: any): CleanupFn | null {
  if (!root) return null
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return null

  const xyMultiplier = 6
  const rotationMultiplier = 5
  const velSmoothing = 0.08

  let prevX = 0
  let prevY = 0
  let velX = 0
  let velY = 0
  let rafId: number | null = null
  let lastTime = performance.now()

  const onMouseMove = (e: Event) => {
    const me = e as MouseEvent
    if (rafId) return
    rafId = requestAnimationFrame(() => {
      const now = performance.now()
      const dt = Math.max(1, now - lastTime)

      const rawX = me.clientX - prevX
      const rawY = me.clientY - prevY

      const scaledRawX = rawX * (16.6667 / dt)
      const scaledRawY = rawY * (16.6667 / dt)

      prevX = me.clientX
      prevY = me.clientY
      lastTime = now

      const spikeThreshold = 30
      if (Math.abs(scaledRawX) > spikeThreshold || Math.abs(scaledRawY) > spikeThreshold) {
        velX = scaledRawX
        velY = scaledRawY
      } else {
        velX = velX * (1 - velSmoothing) + scaledRawX * velSmoothing
        velY = velY * (1 - velSmoothing) + scaledRawY * velSmoothing
      }

      rafId = null
    })
  }

  window.addEventListener('mousemove', onMouseMove)

  const clampXY = gsap.utils.clamp(-40, 40)
  const clampRot = gsap.utils.clamp(-10, 10)

  const elements = Array.from(root.querySelectorAll('[data-momentum-hover-element]'))
  const unsubscribers: CleanupFn[] = []

  elements.forEach((el) => {
    const onEnter = () => {
      const target = (el as Element).querySelector('[data-momentum-hover-target]') || el
      if (!target) return

      const onPointerMove = (pe: Event) => {
        const p = pe as PointerEvent
        const rect = (target as Element).getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const offsetX = p.clientX - centerX
        const offsetY = p.clientY - centerY

        const rawTorque = offsetX * velY - offsetY * velX
        const leverDist = Math.hypot(offsetX, offsetY) || 1
        const angularForce = rawTorque / leverDist

        const velocityX = clampXY(velX * xyMultiplier * 0.6 + offsetX * 0.08)
        const velocityY = clampXY(velY * xyMultiplier * 0.6 + offsetY * 0.08)
        const rotationVelocity = clampRot(angularForce * rotationMultiplier * 0.22 + (offsetX / Math.max(rect.width, 1)) * 8)

        gsap.to(target as any, {
          x: velocityX,
          y: velocityY,
          rotation: rotationVelocity,
          duration: 0.36,
          ease: 'power3.out',
          overwrite: true
        })
      }

      const onLeave = () => {
        ;(el as Element).removeEventListener('pointermove', onPointerMove)
        gsap.to(target as any, { scale: 1, x: 0, y: 0, rotation: 0, duration: 0.45, ease: 'power3.out' })
        ;(el as Element).removeEventListener('pointerleave', onLeave)
      }

      ;(el as Element).addEventListener('pointermove', onPointerMove)
      ;(el as Element).addEventListener('pointerleave', onLeave)
      gsap.to(target as any, { scale: 1.06, duration: 0.22, ease: 'power2.out' })
    }

    ;(el as Element).addEventListener('pointerenter', onEnter)
    unsubscribers.push(() => (el as Element).removeEventListener('pointerenter', onEnter))
  })

  return () => {
    window.removeEventListener('mousemove', onMouseMove)
    unsubscribers.forEach((fn) => fn())
  }
}

function initMarqueeScrollSpeed(
  marquee: HTMLElement | null,
  gsap: any,
  ScrollTrigger: any,
  radial: { setScrollBoost: (boost: number) => void }
): CleanupFn | null {
  if (!marquee) return null

  // Drive marquee speed via tween timeScale, rather than fighting over `startOffset`.
  const clampBoost = gsap.utils.clamp(0.6, 4)
  const trigger = ScrollTrigger.create({
    trigger: marquee,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self: any) => {
      const boost = clampBoost(1 + self.getVelocity() / 900)
      radial.setScrollBoost(boost)
    }
  })

  return () => {
    trigger.kill()
    radial.setScrollBoost(1)
  }
}

</script>

<style scoped>
.radial-text-marquee {
  width: 100%;
  position: relative;
  /* allow full overflow so circular text is never cut off */
  overflow: visible;
  text-transform: uppercase;
  font-weight: 600;
  /* set a reasonable height for the marquee */
  min-height: clamp(8rem, 50vh, 25rem);
  height: auto;
  /* allow the generated SVG to be centered */
  display: block;
}

/* center the generated SVG inside the wrapper */
.radial-text-marquee > svg {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  pointer-events: none;
  width: auto !important;
  height: auto !important;
}

.radial-text-marquee__text {
  /* keep the original text absolutely positioned and invisible so it doesn't reserve large height but can still be measured */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  pointer-events: none;
  margin: 0;
  text-align: center;
  letter-spacing: -.04em;
  white-space: nowrap;
  user-select: none;
  line-height: 1;
  font-size: clamp(4.5em, 10vw, 10em);
}

/* Ensure momentum targets can scale and animate smoothly */
[data-momentum-hover-target] {
  display: inline-block;
  transform-origin: center center;
  will-change: transform;
}
</style>
