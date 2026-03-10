<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const servicesRef = ref<HTMLElement | null>(null)
const bgRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
let mediaContext: gsap.MatchMedia | null = null

onMounted(() => {
  const el = servicesRef.value
  const container = containerRef.value
  if (!(el instanceof HTMLElement) || !(container instanceof HTMLElement)) return

  const cards = el.querySelectorAll<HTMLElement>('.service-card')
  if (!cards.length) return

  const mm = gsap.matchMedia()
  mediaContext = mm

  mm.add('(min-width: 768px)', () => {
    cards.forEach((card, index) => {
      card.style.zIndex = `${200 + index}`
      card.style.pointerEvents = index === cards.length - 1 ? 'auto' : 'none'
    })

    const scrollDistance = Math.round(window.innerHeight * 1.15)
    const setContainerHeight = () => {
      container.style.minHeight = `${scrollDistance + 150}px`
    }
    setContainerHeight()

    const growthTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 60%',
        end: 'top top',
        scrub: 1.2,
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
    const rotationSpread = 18

    cards.forEach((card, index) => {
      const finalRot = parseFloat((card.dataset.rot as string) || '0')
      const initialRot = finalRot + (index - midIndex) * rotationSpread
      gsap.set(card, {
        y: 220,
        opacity: 0,
        scale: 0.985,
        rotation: initialRot,
        transformOrigin: '50% 50%'
      })
    })

    tl.to(
      cards,
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: (index, card) => parseFloat(((card as HTMLElement).dataset.rot as string) || '0'),
        duration: 0.95,
        ease: 'power3.out',
        stagger: { each: 0.52, from: 'start' }
      },
      0
    )

    if (bgRef.value) {
      const startScale = 1.26
      const endScale = 1.18
      const startY = -8
      gsap.set(bgRef.value, { scale: startScale, y: startY, transformOrigin: '50% 50%' })
      for (let i = 0; i < cards.length; i++) {
        const timeOffset = i * 0.52
        const progress = (i + 1) / cards.length
        const targetY = startY * (1 - progress)
        const targetScale = startScale - (startScale - endScale) * progress
        tl.to(bgRef.value, { y: targetY, scale: targetScale, duration: 0.6, ease: 'power1.out' }, timeOffset)
      }
      tl.to(bgRef.value, { y: 0, scale: 1.18, ease: 'none' }, '>-0.1')
    }

    const onResize = () => {
      setContainerHeight()
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize)
    ScrollTrigger.refresh()

    return () => {
      window.removeEventListener('resize', onResize)
      container.style.minHeight = ''
      tl.kill()
      growthTl.kill()
      if (bgRef.value) gsap.killTweensOf(bgRef.value)
      cards.forEach(card => gsap.killTweensOf(card))
    }
  })

  mm.add('(max-width: 767px)', () => {
    container.style.minHeight = ''

    cards.forEach((card, index) => {
      card.style.zIndex = `${300 + index}`
      card.style.pointerEvents = 'auto'
      gsap.set(card, {
        y: 36,
        opacity: 0,
        rotation: 0,
        scale: 0.985,
        transformOrigin: '50% 50%'
      })

      gsap.to(card, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          end: 'top 62%',
          scrub: 0.5,
          invalidateOnRefresh: true
        }
      })
    })

    if (bgRef.value) {
      gsap.set(bgRef.value, { scale: 1.16, y: -6, transformOrigin: '50% 50%' })
      gsap.to(bgRef.value, {
        y: 0,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true
        }
      })
    }

    ScrollTrigger.refresh()

    return () => {
      if (bgRef.value) gsap.killTweensOf(bgRef.value)
      cards.forEach(card => gsap.killTweensOf(card))
    }
  })
})

onUnmounted(() => {
  if (mediaContext) {
    mediaContext.revert()
    mediaContext = null
  }
})
</script>

<template>
  <div class="flex min-h-svh items-center justify-center scroll-mt-28 md:scroll-mt-36">
    <div ref="containerRef" class="w-full min-h-svh relative overflow-hidden">
      <LayoutTheContainer>
        <div class="z-40 relative">
          <div class="flex items-center justify-center flex-col pt-28 md:pt-32 px-4">
            <h1 class="z-50 text-4xl md:text-7xl uppercase font-bold max-w-200 leading-tight md:leading-18 text-center text-primary-600">Alles begint bij het verhaal.</h1>
            <p class="z-50 text-base md:text-2xl font-semibold text-center max-w-88 md:max-w-96 pt-4 font-family-helvetica -tracking-[1px] text-white">Of het nu branding, web of video is — zonder richting blijft het ruis.</p>
          </div>
        </div>
        <div ref="servicesRef" class="z-40 relative pt-8 md:pt-12 flex items-center justify-center px-4">
          <div class="relative w-full max-w-4xl md:h-[80vh]">
            <div class="service-card sticky top-[calc(6.5rem+env(safe-area-inset-top))] md:top-[28%] md:absolute md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 transform-gpu w-[20rem] md:w-120 h-92 md:h-108 p-6 md:p-10 rounded-2xl bg-[#142026] flex items-start justify-between flex-col shadow-xl will-change-transform" data-rot="-5">
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

            <div class="service-card sticky top-[calc(6.5rem+env(safe-area-inset-top))] mt-4 md:mt-0 md:top-[28%] md:absolute md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 transform-gpu w-[20rem] md:w-120 h-92 md:h-108 p-6 md:p-10 rounded-2xl bg-[#476574] flex items-start justify-between flex-col shadow-xl will-change-transform" data-rot="-2">
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

            <div class="service-card sticky top-[calc(6.5rem+env(safe-area-inset-top))] mt-4 md:mt-0 md:top-[28%] md:absolute md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 transform-gpu w-[20rem] md:w-120 h-92 md:h-108 p-6 md:p-10 rounded-2xl bg-[#FEFF33] flex items-start justify-between flex-col shadow-xl will-change-transform" data-rot="4">
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

            <div class="service-card sticky top-[calc(6.5rem+env(safe-area-inset-top))] mt-4 md:mt-0 md:top-[28%] md:absolute md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 transform-gpu w-[20rem] md:w-120 h-92 md:h-108 p-6 md:p-10 rounded-2xl bg-white flex items-start justify-between flex-col shadow-xl will-change-transform" data-rot="1">
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
