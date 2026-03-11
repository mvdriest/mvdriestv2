<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import Flip from 'gsap/Flip'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, Flip)

const rootRef = ref<HTMLElement | null>(null)

let masterTimeline: gsap.core.Timeline | null = null
let resizeTimeout: ReturnType<typeof setTimeout> | null = null
let resizeHandler: (() => void) | null = null

type ScrollRangeConfig = {
  trigger: Element
  start: string
  endTrigger: Element
  end: string
}

const getScrollRange = ({ trigger, start, endTrigger, end }: ScrollRangeConfig) => {
  const st = ScrollTrigger.create({ trigger, start, endTrigger, end })
  const range = Math.max(1, st.end - st.start)
  st.kill()
  return range
}

const buildBackgroundZoomTimeline = () => {
  const root = rootRef.value
  if (!(root instanceof HTMLElement)) return

  const containers = root.querySelectorAll<HTMLElement>('[data-bg-zoom-init]')
  if (!containers.length) return
  const firstContainer = containers[0]
  const lastContainer = containers[containers.length - 1]
  if (!(firstContainer && lastContainer)) return

  if (masterTimeline) {
    masterTimeline.kill()
    masterTimeline = null
  }

  masterTimeline = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: firstContainer.querySelector<HTMLElement>('[data-bg-zoom-start]') || firstContainer,
      start: 'center center',
      endTrigger: lastContainer,
      end: 'bottom top',
      scrub: true,
      invalidateOnRefresh: true
    }
  })

  containers.forEach((container) => {
    const startEl = container.querySelector<HTMLElement>('[data-bg-zoom-start]')
    const endEl = container.querySelector<HTMLElement>('[data-bg-zoom-end]')
    const contentEl = container.querySelector<HTMLElement>('[data-bg-zoom-content]')
    const darkEl = container.querySelector<HTMLElement>('[data-bg-zoom-dark]')
    const imgEl = container.querySelector<HTMLElement>('[data-bg-zoom-img]')
    if (!(startEl && endEl && contentEl)) return

    const startRadius = getComputedStyle(startEl).borderRadius
    const endRadius = getComputedStyle(endEl).borderRadius
    const hasRadius = startRadius !== '0px' || endRadius !== '0px'

    contentEl.style.overflow = hasRadius ? 'hidden' : ''
    if (hasRadius) gsap.set(contentEl, { borderRadius: startRadius })

    Flip.fit(contentEl, startEl, { scale: false })

    const zoomScrollRange = getScrollRange({
      trigger: startEl,
      start: 'center center',
      endTrigger: endEl,
      end: 'center center'
    })

    const afterScrollRange = getScrollRange({
      trigger: endEl,
      start: 'center center',
      endTrigger: container,
      end: 'bottom top'
    })

    const fitVars = Flip.fit(contentEl, endEl, {
      getVars: true,
      scale: false
    }) as gsap.TweenVars | null

    if (fitVars && masterTimeline) {
      masterTimeline.to(contentEl, {
        ...fitVars,
        duration: zoomScrollRange,
        ease: 'none'
      })
    }

    if (hasRadius) {
      masterTimeline?.to(contentEl, {
        borderRadius: endRadius,
        duration: zoomScrollRange
      }, '<')
    }

    masterTimeline?.to(contentEl, {
      y: `+=${afterScrollRange}`,
      duration: afterScrollRange
    })

    if (darkEl) {
      gsap.set(darkEl, { opacity: 0 })
      masterTimeline?.to(darkEl, {
        opacity: 0.75,
        duration: afterScrollRange * 0.25
      }, '<')
    }

    if (imgEl) {
      gsap.set(imgEl, { scale: 1, transformOrigin: '50% 50%' })
      masterTimeline?.to(imgEl, {
        scale: 1.25,
        yPercent: -10,
        duration: afterScrollRange
      }, '<')
    }
  })

  ScrollTrigger.refresh()
}

onMounted(async () => {
  await nextTick()

  buildBackgroundZoomTimeline()

  resizeHandler = () => {
    if (resizeTimeout) clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      buildBackgroundZoomTimeline()
    }, 100)
  }

  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  if (masterTimeline) {
    masterTimeline.kill()
    masterTimeline = null
  }

  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
    resizeTimeout = null
  }

  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }
})
</script>

<template>
  <div ref="rootRef">
    <section
      data-bg-zoom-init
      class="flex min-h-svh flex-col items-center justify-center overflow-clip bg-dark-700 px-4 pt-[calc(50dvh-15em)] text-gray-200"
    >
      <div class="w-full">
        <h1 class="mx-auto mb-[-0.375em] mt-0 max-w-[7em] text-center text-[3.75em] leading-[0.95] font-normal tracking-[-0.04em] md:text-[7.5em]">
          Alles begint bij het
          <span class="text-dark-500"> verhaal</span>
        </h1>
      </div>

      <div data-bg-zoom-start class="relative aspect-square w-[16em] rounded-[16em]">
        <div
          data-bg-zoom-content
          class="absolute left-0 top-0 h-full w-full overflow-hidden rounded-inherit bg-dark-500 will-change-[width,height,transform]"
        >
          <nuxt-img
            width="1440"
            data-bg-zoom-img
            alt="Camerafoto"
            src="/images/other/camerafotoik.jpg"
            loading="lazy"
            class="absolute h-full w-full object-cover"
          />
    
          <div data-bg-zoom-dark class="absolute left-0 top-0 h-full w-full bg-dark-600 opacity-0"></div>
        </div>
      </div>

      <div data-bg-zoom-end class="h-dvh w-screen"></div>

      <div class="relative flex w-full flex-col items-center gap-8 pb-[calc(50dvh-12em)]">
        <h2 class="mx-auto mb-[-0.375em] mt-0 max-w-[19em] text-center text-[3.75em] leading-[1.1] font-semibold md:text-[2.5em] font-family-helvetica -tracking-[1px]">
          Over de afgelopen jaren heb ik gewerkt aan een breed scala aan merken: van branding en webdesign tot fotografie, video en campagnes.
        </h2>
        <h2 class="mx-auto mt-[33dvh] mb-[-0.375em] max-w-[19em] text-center text-[3.75em] leading-[1.1] font-semibold md:text-[2.5em] font-family-helvetica -tracking-[1px]">
          Die brede ervaring zorgt ervoor dat ik altijd zie hoe alles samenhangt.  Ik geloof dat een merk niet alleen mooi moet zijn, maar moet raken, onthouden worden én resultaat moet opleveren.  
        </h2>
        <h2 class="mx-auto mt-[33dvh] mb-[-0.375em] max-w-[19em] text-center text-[3.75em] leading-[1.1] font-semibold md:text-[2.5em] font-family-helvetica -tracking-[1px]">
          Daarom maak ik geen losse plaatjes of sites.

          Ik bouw complete ervaringen: video die emotie overbrengt, foto’s die verhalen vertellen, websites die converteren, branding die consistent blijft hangen.
        </h2>
      </div>
    </section>

    <section class="relative flex min-h-dvh w-full items-center justify-center bg-gray-200 px-4 text-dark-700">
      <p class="absolute bottom-5 w-full text-center text-[1.25em] leading-none font-black tracking-[-0.02em] text-primary-600">
        PØDRICK
      </p>
      <h2 class="mx-auto mb-[-0.375em] mt-0 max-w-[7em] text-center text-[3.75em] leading-[0.95] font-normal tracking-[-0.04em] md:text-[7.5em]">
        And we reached the end!
      </h2>
    </section>
  </div>
</template>