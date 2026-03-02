<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const servicesRef = ref<HTMLElement | null>(null)
const bgRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const el = servicesRef.value
  const container = containerRef.value
  if (!(el instanceof HTMLElement) || !(container instanceof HTMLElement)) return

  const isMobile = window.matchMedia('(max-width: 767px)').matches
  const cards = el.querySelectorAll<HTMLElement>('.service-card')
  if (!cards.length) return

  // stacking order: later cards on top
  cards.forEach((c, i) => (c.style.zIndex = `${200 + i}`))

  // keep pinned animation compact with device-specific distance
  const scrollDistance = Math.round(window.innerHeight * (isMobile ? 0.95 : 1.15))

  const setContainerHeight = () => {
    // provide just enough space for the pinned animation + a small buffer
    container.style.minHeight = `${scrollDistance + (isMobile ? 70 : 150)}px`
  }
  setContainerHeight()

  // Growth animation BEFORE pinned section: expand from inert to full-screen
  const growthTl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 60%',
      end: 'top top',
      scrub: 1.2,
      markers: false,
      invalidateOnRefresh: true
    }
  })

  growthTl.fromTo(
    container,
    {
      transform: 'scale(0.85)',
      borderRadius: '1.5rem',
      padding: '1.5rem'
    },
    {
      transform: 'scale(1)',
      borderRadius: '0rem',
      padding: '0rem',
      ease: 'none'
    }
  )

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: `+=${scrollDistance}`,
      scrub: 1.2,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      fastScrollEnd: true,
      invalidateOnRefresh: true
    }
  })

  const midIndex = (cards.length - 1) / 2
  const rotationSpread = isMobile ? 10 : 18

  cards.forEach((el, i) => {
    const finalRot = parseFloat((el.dataset.rot as string) || '0')
    const initialRot = finalRot + (i - midIndex) * rotationSpread
    gsap.set(el, { y: isMobile ? 140 : 220, opacity: 0, scale: 0.985, rotation: initialRot, transformOrigin: '50% 50%' })
  })

  // reveal cards one-by-one
  tl.to(cards, {
    y: 0,
    opacity: 1,
    scale: 1,
    rotation: (i, el) => parseFloat(((el as HTMLElement).dataset.rot as string) || '0'),
    duration: isMobile ? 0.75 : 0.95,
    ease: 'power3.out',
    stagger: { each: isMobile ? 0.42 : 0.52, from: 'start' }
  }, 0)

  // subtle parallax on the background while ending in a centered final position
  if (bgRef.value) {
    const startScale = isMobile ? 1.2 : 1.26
    const endScale = isMobile ? 1.13 : 1.18
    const startY = isMobile ? -4 : -8
    gsap.set(bgRef.value, { scale: startScale, y: startY, transformOrigin: '50% 50%' })
    for (let i = 0; i < cards.length; i++) {
      const timeOffset = i * (isMobile ? 0.42 : 0.52)
      const progress = (i + 1) / cards.length
      const targetY = startY * (1 - progress)
      const targetScale = startScale - (startScale - endScale) * progress
      tl.to(bgRef.value, { y: targetY, scale: targetScale, duration: isMobile ? 0.45 : 0.6, ease: 'power1.out' }, timeOffset)
    }
  }

  // no final tuck animation: leave cards in their revealed positions (rotation from data-rot) so they don't jump after reveal

  if (bgRef.value) {
    // finish centered: equal crop/padding above and below
    tl.to(bgRef.value, { y: 0, scale: isMobile ? 1.13 : 1.18, ease: 'none' }, '>-0.1')
  }

  // only top card interactive
  const topIdx = cards.length - 1
  cards.forEach((c, i) => (c.style.pointerEvents = i === topIdx ? 'auto' : 'none'))

  ScrollTrigger.refresh()

  const onResize = () => {
    setContainerHeight()
    ScrollTrigger.refresh()
  }
  window.addEventListener('resize', onResize)

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
    tl.kill()
    growthTl.kill()
    ScrollTrigger.getAll()
      .filter(st => st.vars.trigger === container)
      .forEach(st => st.kill())
    if (bgRef.value) gsap.killTweensOf(bgRef.value)
    cards.forEach(card => gsap.killTweensOf(card))
  })
})
</script>

<template>
  <div class="flex min-h-svh items-center justify-center">
    <div ref="containerRef" class="w-full min-h-svh relative overflow-hidden">
      <LayoutTheContainer>
        <div class="z-40 relative">
          <div class="flex items-center justify-center flex-col h-full pt-32 md:pt-48 px-4">
            <h1 class="z-50 text-4xl md:text-7xl uppercase font-bold max-w-200 leading-tight md:leading-18 text-center text-primary-600">Alles begint bij het verhaal.</h1>
            <p class="z-50 text-base md:text-2xl font-semibold text-center max-w-88 md:max-w-96 pt-4 font-family-helvetica -tracking-[1px] text-white">Of het nu branding, web of video is — zonder richting blijft het ruis.</p>
          </div>
        </div>
        <div ref="servicesRef" class="z-40 relative pt-8 md:pt-12 flex items-center justify-center pointer-events-none px-4">
          <div class="relative w-full max-w-4xl h-[65vh] md:h-[80vh]">
            <div class="service-card absolute left-1/2 top-[34%] md:top-[28%] -translate-x-1/2 -translate-y-1/2 transform-gpu w-[20rem] md:w-120 h-92 md:h-108 p-6 md:p-10 rounded-2xl bg-[#142026] flex items-start justify-between flex-col -rotate-6 shadow-xl will-change-transform pointer-events-auto" data-rot="-5">
              <p class="text-sm md:text-xl font-semibold font-family-helvetica -tracking-[1px] uppercase rounded-2xl px-4 md:px-5 bg-white py-2">Web</p>
              <div class="text-white">
                <h3 class="text-xl md:text-3xl font-semibold font-family-helvetica -tracking-[1px]">Websites die werken.</h3>
                <div class="pt-4 md:pt-6 text-sm md:text-lg opacity-65 font-family-helvetica font-semibold flex flex-col gap-2">
                  <p>Van one-pager tot compleet platform.</p>
                  <p>Strak ontworpen. Snel gebouwd.</p>
                  <p>Altijd met strategie erachter.</p>
                </div>
              </div>
            </div>

            <div class="service-card absolute left-1/2 top-[34%] md:top-[28%] -translate-x-1/2 -translate-y-1/2 transform-gpu w-[20rem] md:w-120 h-92 md:h-108 p-6 md:p-10 rounded-2xl bg-[#476574] flex items-start justify-between flex-col rotate-3 shadow-xl will-change-transform pointer-events-auto" data-rot="-2">
              <p class="text-sm md:text-xl font-semibold font-family-helvetica -tracking-[1px] uppercase rounded-2xl px-4 md:px-5 bg-white py-2">Branding</p>
              <div class="text-white">
                <h3 class="text-xl md:text-3xl font-semibold font-family-helvetica -tracking-[1px]">Merken met karakter.</h3>
                <div class="pt-4 md:pt-6 text-sm md:text-lg opacity-65 font-family-helvetica font-semibold flex flex-col gap-2">
                  <p>Logo, identiteit en visuele lijn.</p>
                  <p>Herkenbaar. Consistent.</p>
                  <p>Gebouwd om te blijven hangen.</p>
                </div>
              </div>
            </div>

            <div class="service-card absolute left-1/2 top-[34%] md:top-[28%] -translate-x-1/2 -translate-y-1/2 transform-gpu w-[20rem] md:w-120 h-92 md:h-108 p-6 md:p-10 rounded-2xl bg-[#FEFF33] flex items-start justify-between flex-col rotate-3 shadow-xl will-change-transform pointer-events-auto" data-rot="4">
              <p class="text-sm md:text-xl font-semibold font-family-helvetica -tracking-[1px] uppercase rounded-2xl px-4 md:px-5 bg-[#1D1D21] py-2 text-white">VIDEOGRAFIE</p>
              <div class="text-[#1D1D21]">
                <h3 class="text-xl md:text-3xl font-semibold font-family-helvetica -tracking-[1px]">Verhalen in beeld.</h3>
                <div class="pt-4 md:pt-6 text-sm md:text-lg opacity-65 font-family-helvetica font-semibold flex flex-col gap-2">
                  <p>Van concept tot eindproduct.</p>
                  <p>Visueel sterk. Emotioneel geladen.</p>
                  <p>Vertelt het verhaal van de klant.</p>
                </div>
              </div>
            </div>

            <div class="service-card absolute left-1/2 top-[34%] md:top-[28%] -translate-x-1/2 -translate-y-1/2 transform-gpu w-[20rem] md:w-120 h-92 md:h-108 p-6 md:p-10 rounded-2xl bg-white flex items-start justify-between flex-col rotate-3 shadow-xl will-change-transform pointer-events-auto" data-rot="1">
              <p class="text-sm md:text-xl font-semibold font-family-helvetica -tracking-[1px] uppercase rounded-2xl px-4 md:px-5 bg-[#1D1D21] py-2 text-white">fotografie</p>
              <div class="text-[#1D1D21]">
                <h3 class="text-xl md:text-3xl font-semibold font-family-helvetica -tracking-[1px]">Verhalen in beeld.</h3>
                <div class="pt-4 md:pt-6 text-sm md:text-lg opacity-65 font-family-helvetica font-semibold flex flex-col gap-2">
                  <p>Van concept tot eindproduct.</p>
                  <p>Visueel sterk. Emotioneel geladen.</p>
                  <p>Vertelt het verhaal van de klant.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutTheContainer>

      <img ref="bgRef" class="object-cover object-center w-full h-full absolute inset-0 grayscale-100 z-0 pointer-events-none will-change-transform" src="/images/other/camerafotoik.jpg" alt="">
      <div class="bg-black opacity-30 w-full h-full absolute inset-0 z-10 pointer-events-none"></div>
    </div>
  </div>
</template>
