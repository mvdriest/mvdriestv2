<template>
  <section data-momentum-hover-init class="bg-dark-600 py-36 overflow-x-hidden">
    <div data-radial-text-marquee-init data-radial-text-marquee-speed="2" data-radial-text-marquee-radius="8" data-radial-text-marquee-spacer="-" data-radial-text-marquee-spacer-color="#F5FF00" class="radial-text-marquee text-white">
      <div data-radial-text-marquee-text class="radial-text-marquee__text">Branding</div>
      <div data-radial-text-marquee-text class="radial-text-marquee__text">Web</div>
      <div data-radial-text-marquee-text class="radial-text-marquee__text">Video</div>
      <div data-radial-text-marquee-text class="radial-text-marquee__text">Foto</div>
    </div>
    <LayoutTheContainer>
      <div class="flex items-center justify-center flex-col">
        <h2 class="text-5xl uppercase max-w-4xl md:text-8xl font-bold text-center text-white mt-8 md:leading-[5.8rem] z-10 md:-tracking-[4px]">Wil je dat je <br/> merk ineens <br/><span data-momentum-hover-element class="inline-block"><span data-momentum-hover-target class="bg-primary-600 px-8 text-dark-600 inline-block leading-none align-middle pb-4 mt-4">wel</span></span> <span data-momentum-hover-element class="inline-block"><span data-momentum-hover-target class="bg-[#FF5421] px-8 text-white inline-block leading-none align-middle pb-4 mt-4">opvalt?</span></span></h2>
          <p class=" mt-7 text-white text-[22px] font-semibold text-center max-w-2xl font-family-helvetica -tracking-[1px] ">Ik geloof in een wereld waar sterke websites, cinematische video, krachtige fotografie en consistente branding je merk laten opvallen zoals het verdient.</p>
          <IconButton label="Naar aanmeldformulier" href="/contact" class="mt-10" />
      </div>
    </LayoutTheContainer>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  // initRadialTextMarquee adapted from provided script and extended to support multiple text nodes
  function initRadialTextMarquee() {
    const wraps = document.querySelectorAll('[data-radial-text-marquee-init]')
    if (!wraps.length) return

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
      const s = getComputedStyle(fromEl as Element)
      const fsPx = parseFloat(s.fontSize) || 16
      const lsPx = lsToPx(s.letterSpacing, fsPx)

      svgText.setAttribute('font-family', (s as any).fontFamily)
      svgText.setAttribute('font-size', (s as any).fontSize)
      svgText.setAttribute('font-weight', (s as any).fontWeight)
      svgText.setAttribute('dominant-baseline', 'alphabetic')
      svgText.setAttribute('text-rendering', 'geometricPrecision')
      svgText.setAttribute('fill', (s as any).color)

      svgText.setAttribute('letter-spacing', `${lsPx}px`)
      svgText.setAttribute('font-kerning', 'none')
      svgText.setAttribute('font-feature-settings', '"kern" 0, "liga" 0, "clig" 0')

      if (svgTextPath) svgTextPath.setAttribute('letter-spacing', `${lsPx}px`)

      return { fsPx, lsPx, ff: (s as any).fontFamily, fw: (s as any).fontWeight, fz: (s as any).fontSize }
    }

    const tspan = (tp: Element, v: string, fill?: string | null, lsPx?: number | null) => {
      const t = document.createElementNS(ns, 'tspan')
      t.textContent = v
      if (lsPx != null) t.setAttribute('letter-spacing', `${lsPx}px`)
      if (fill) {
        // set both attribute and inline style to ensure cross-browser rendering
        t.setAttribute('fill', fill)
        ;(t as any).style.fill = fill
      }
      tp.appendChild(t)
    }

    const buildRun = (tp: Element, words: string[], spacer: string, spacerColor: string | null, pad: string, reps: number, lsPx: number) => {
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

    const setPlaying = (st: any, play: boolean) => {
      st.inView = play
      if (!st.tw) return
      if (prm) return st.tw.pause()
      play ? st.tw.play() : st.tw.pause()
    }

    const makeSvg = (wrap: Element) => {
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
      textEls.forEach((t) => (t as HTMLElement).style.opacity = '0')

      return { svg, g, path, text, tp, textEls }
    }

    wraps.forEach((wrap) => {
      const textElFirst = wrap.querySelector('[data-radial-text-marquee-text]')
      if (!textElFirst) return

      const st: any = { ...(makeSvg(wrap)), tw: null, px: { x: 0 }, inView: true, raf: 0, qs: null }
      new IntersectionObserver((e) => setPlaying(st, !!(e[0] && e[0].isIntersecting)), { threshold: 0 }).observe(wrap)

      const rebuild = () => {
        const textEls: NodeListOf<Element> = st.textEls || wrap.querySelectorAll('[data-radial-text-marquee-text]')
        // read spacer before joining so the spacer appears between each item
        const spacer = (wrap as HTMLElement).getAttribute('data-radial-text-marquee-spacer') || '•'
        const spacerColor = (wrap as HTMLElement).getAttribute('data-radial-text-marquee-spacer-color') || null
        const baseText = Array.from(textEls).map((el) => ((el.textContent || '').trim())).filter(Boolean).join(` ${spacer} `)
        if (!baseText) return

        const speed = clamp((wrap as HTMLElement).getAttribute('data-radial-text-marquee-speed') || 4, 0.1, 200)
        const speedPx = Math.max(speed * 100 * speedMul(), 1)

        const radiusLevel = clamp((wrap as HTMLElement).getAttribute('data-radial-text-marquee-radius') || 10, 0, 10)
        const level01 = radiusLevel / 10

        const padCount = clamp((wrap as HTMLElement).getAttribute('data-radial-text-marquee-spacer-padding') || 1, 0, 20)
        const pad = '\u00A0'.repeat(padCount)

        const typo = syncType(textElFirst as Element, st.text, st.tp)

        const wrapW = Math.max((wrap as HTMLElement).clientWidth || 1, 1)
        const wrapH = Math.max((wrap as HTMLElement).clientHeight || (textElFirst as HTMLElement).offsetHeight || 1, 1)
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

        st.path.setAttribute(
          'd',
          level01 <= 0.0001 ? `M 0 ${y} L ${w} ${y}` : `M 0 ${y} A ${r} ${r} 0 0 1 ${w} ${y}`
        )

        st.text.setAttribute('x', '0')
        st.text.setAttribute('y', `${y}`)
        st.g.setAttribute('transform', `translate(0 ${typo.fsPx})`)

        cancelAnimationFrame(st.raf)
        st.raf = requestAnimationFrame(() => {
          const fontCss = `${typo.fw} ${typo.fz} ${typo.ff}`

          // compute loop length as the sum of each word + pad + spacer + pad
          const words = Array.from(textEls).map((el) => ((el.textContent || '').trim())).filter(Boolean) as string[]
          let loopLen = words.reduce((acc, w) => {
            return acc +
              measureLS(w, fontCss, typo.lsPx) +
              measureLS(pad, fontCss, typo.lsPx) +
              measureLS(spacer, fontCss, typo.lsPx) +
              measureLS(pad, fontCss, typo.lsPx)
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

          st.qs = gsap && (gsap as any).quickSetter ? (gsap as any).quickSetter(st.tp, 'attr') : null

          const setOffset = (v: any) => {
            const val = `${v.toFixed(3)}px`
            if (st.qs) st.qs({ startOffset: val })
            else st.tp.setAttribute('startOffset', val)
          }

          st.px.x = 0
          st.tw = (gsap as any).to(st.px, {
            x: loopLen,
            duration: loopLen / speedPx,
            ease: 'none',
            repeat: -1,
            onUpdate: () => {
              const x = ((st.px.x % loopLen) + loopLen) % loopLen
              setOffset(-x)
            }
          })

          setPlaying(st, st.inView)
        })
      }

      const schedule = (() => {
        let raf = 0
        return () => {
          cancelAnimationFrame(raf)
          raf = requestAnimationFrame(rebuild)
        }
      })()

      rebuild()

      if (document.fonts && (document.fonts as any).ready) (document.fonts as any).ready.then(schedule).catch(() => {})
      else setTimeout(schedule, 150)

      if (window.ResizeObserver) {
        const ro = new ResizeObserver(schedule)
        ro.observe(wrap)
        const textEls: NodeListOf<Element> = st.textEls || wrap.querySelectorAll('[data-radial-text-marquee-text]')
        textEls.forEach((te) => ro.observe(te))
      } else {
        window.addEventListener('resize', schedule)
      }
    })
  }

  // Initialize Radial Text Marquee
  initRadialTextMarquee()

  // --- Momentum based hover (simplified, does not require InertiaPlugin) ---
  function initMomentumBasedHover() {
    // only on hover-capable devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    // --- livelier but still smooth momentum settings ---
    const xyMultiplier = 6
    const rotationMultiplier = 5
    const velSmoothing = 0.08 // a bit less smoothing so it responds faster

    let prevX = 0
    let prevY = 0
    let velX = 0
    let velY = 0
    let rafId: number | null = null
    let lastTime = performance.now()

    // Track pointer velocity (smoothed, but allow spikes to override)
    window.addEventListener('mousemove', (e: Event) => {
      const me = e as MouseEvent
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const now = performance.now()
        const dt = Math.max(1, now - lastTime) // ms

        const rawX = me.clientX - prevX
        const rawY = me.clientY - prevY

        // normalize raw movement to a 60fps equivalent so velocities are comparable across devices
        const scaledRawX = rawX * (16.6667 / dt)
        const scaledRawY = rawY * (16.6667 / dt)

        prevX = me.clientX
        prevY = me.clientY
        lastTime = now

        // if user moves very fast, prefer the raw spike so the interaction feels responsive
        const spikeThreshold = 30 // px per 60fps frame
        if (Math.abs(scaledRawX) > spikeThreshold || Math.abs(scaledRawY) > spikeThreshold) {
          velX = scaledRawX
          velY = scaledRawY
        } else {
          // exponential moving average for smoothness on normal moves
          velX = velX * (1 - velSmoothing) + scaledRawX * velSmoothing
          velY = velY * (1 - velSmoothing) + scaledRawY * velSmoothing
        }

        rafId = null
      })
    })

    const clampXY = gsap.utils.clamp(-40, 40)
    const clampRot = gsap.utils.clamp(-10, 10)

    document.querySelectorAll('[data-momentum-hover-element]').forEach((el) => {
      // Use pointer events and pointermove for continuous, smooth updates.
      el.addEventListener('pointerenter', (ev: Event) => {
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

          // combine smoothed pointer velocity with a larger offset-based response so motion feels more open
          const velocityX = clampXY(velX * xyMultiplier * 0.6 + offsetX * 0.08)
          const velocityY = clampXY(velY * xyMultiplier * 0.6 + offsetY * 0.08)
          const rotationVelocity = clampRot(angularForce * rotationMultiplier * 0.22 + (offsetX / Math.max(rect.width, 1)) * 8)

          // smooth-to the computed values; overwrite ensures responsiveness
          gsap.to(target as any, { x: velocityX, y: velocityY, rotation: rotationVelocity, duration: 0.36, ease: 'power3.out', overwrite: true })
        }

        ;(el as Element).addEventListener('pointermove', onPointerMove)

        // remove pointermove on leave and return to neutral
        const onLeave = () => {
          ;(el as Element).removeEventListener('pointermove', onPointerMove)
          // gently scale back to normal
          gsap.to(target as any, { scale: 1, x: 0, y: 0, rotation: 0, duration: 0.45, ease: 'power3.out' })
          ;(el as Element).removeEventListener('pointerleave', onLeave)
        }

        ;(el as Element).addEventListener('pointerleave', onLeave)
        // scale up slightly on enter so the element feels larger
        gsap.to(target as any, { scale: 1.06, duration: 0.22, ease: 'power2.out' })
       })
     })

   }

   // Initialize simplified momentum hover
   initMomentumBasedHover()

   // --- Add scroll-triggered speed boost to marquee ---
   function initMarqueeScrollSpeed() {
     const marquee = document.querySelector('[data-radial-text-marquee-init]')
     if (!marquee) return

     const svgTextPath = marquee.querySelector('textPath')
     if (!svgTextPath) return

     let baseOffset = 0
     gsap.to({ offset: 0 }, {
       offset: 1000,
       scrollTrigger: {
         trigger: marquee,
         start: 'top center',
         end: 'bottom center',
         scrub: 1,
         markers: false,
         onUpdate: (self) => {
           // boost speed progressively based on scroll progress
           const speedMultiplier = 1 + self.getVelocity() / 200
           baseOffset += speedMultiplier
           svgTextPath.setAttribute('startOffset', `${baseOffset}px`)
         }
       },
       ease: 'none'
     })
   }

   initMarqueeScrollSpeed()

   // cleanup on unmount: remove any SVGs/listeners created by the init function
   onUnmounted(() => {
     const wraps = document.querySelectorAll('[data-radial-text-marquee-init]')
     wraps.forEach((wrap) => {
       // remove any svg children created
       const svgs = wrap.querySelectorAll('svg')
       svgs.forEach((s) => s.remove())
     })
   })
 })

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
