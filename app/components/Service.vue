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

  const cards = el.querySelectorAll<HTMLElement>('.service-card')
  if (!cards.length) return

  // stacking order: later cards on top
  cards.forEach((c, i) => (c.style.zIndex = `${200 + i}`))

  // keep pinned animation compact: use a fixed scroll distance (1.2 viewport heights)
  const scrollDistance = Math.round(window.innerHeight * 1.2)

  const setContainerHeight = () => {
    // provide just enough space for the pinned animation + a small buffer to avoid large white space
    container.style.minHeight = `${scrollDistance + 150}px`
  }
  setContainerHeight()

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: `+=${scrollDistance}`,
      scrub: 0.9,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1
    }
  })

  const midIndex = (cards.length - 1) / 2

  cards.forEach((el, i) => {
    const finalRot = parseFloat((el.dataset.rot as string) || '0')
    const initialRot = finalRot + (i - midIndex) * 18
    gsap.set(el, { y: 220, opacity: 0, scale: 0.98, rotation: initialRot, transformOrigin: '50% 50%' })
  })

  // reveal cards one-by-one
  tl.to(cards, {
    y: 0,
    opacity: 1,
    scale: 1,
    rotation: (i, el) => parseFloat(((el as HTMLElement).dataset.rot as string) || '0'),
    duration: 0.9,
    ease: 'power4.out',
    stagger: { each: 0.6, from: 'start' }
  }, 0)

  // add small parallax steps on the background for each revealed card
  if (bgRef.value) {
    for (let i = 0; i < cards.length; i++) {
      const timeOffset = i * 0.6 // matches the stagger
      const targetY = -5 - i * 3 // incremental downward movement per card
      tl.to(bgRef.value, { yPercent: targetY, duration: 0.6, ease: 'power1.out' }, timeOffset)
    }
  }

  // no final tuck animation: leave cards in their revealed positions (rotation from data-rot) so they don't jump after reveal

  if (bgRef.value) {
    // ensure final subtle parallax doesn't overshoot (final position is handled by per-card steps above)
    tl.to(bgRef.value, { yPercent: Math.min(-5 - (cards.length - 1) * 3, -18), ease: 'none' }, '>-0.1')
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
    ScrollTrigger.getAll().forEach(st => st.kill())
    gsap.killTweensOf('*')
  })
})
</script>

<template>
  <div class="flex min-h-svh h-full items-center justify-center">
    <div ref="containerRef" class="w-full h-svh relative overflow-hidden">
      <LayoutTheContainer>
        <div class="z-40 relative">
          <div class="flex items-center justify-center flex-col h-full pt-36">
            <h1 class="z-50 text-7xl uppercase font-bold max-w-[50rem] leading-18 text-center text-primary-600">Alles begint bij het verhaal.</h1>
            <p class="z-50 text-2xl font-semibold text-center max-w-96 pt-4 font-family-helvetica -tracking-[1px] text-white">Of het nu branding, web of video is — zonder richting blijft het ruis.</p>
          </div>
        </div>
        <div ref="servicesRef" class="z-40 relative pt-12 flex items-center justify-center pointer-events-none">
          <div class="relative w-full max-w-4xl h-[80vh]">
            <div class="service-card absolute left-1/2 top-[28%] -translate-x-1/2 -translate-y-1/2 transform-gpu w-[30rem] h-[27rem] p-10 rounded-2xl bg-[#142026] flex items-start justify-between flex-col -rotate-6 shadow-xl will-change-transform pointer-events-auto" data-rot="-5">
              <p class="text-xl font-semibold font-family-helvetica -tracking-[1px] uppercase rounded-2xl px-5 bg-white py-2">Web</p>
              <div class="text-white">
                <h3 class="text-3xl font-semibold font-family-helvetica -tracking-[1px]">Websites die werken.</h3>
                <div class="pt-6 text-lg opacity-65 font-family-helvetica font-semibold flex flex-col gap-2">
                  <p>Van one-pager tot compleet platform.</p>
                  <p>Strak ontworpen. Snel gebouwd.</p>
                  <p>Altijd met strategie erachter.</p>
                </div>
              </div>
            </div>

            <div class="service-card absolute left-1/2 top-[28%] -translate-x-1/2 -translate-y-1/2 transform-gpu w-[30rem] h-[27rem] p-10 rounded-2xl bg-[#476574] flex items-start justify-between flex-col rotate-3 shadow-xl will-change-transform pointer-events-auto" data-rot="-2">
              <p class="text-xl font-semibold font-family-helvetica -tracking-[1px] uppercase rounded-2xl px-5 bg-white py-2">Branding</p>
              <div class="text-white">
                <h3 class="text-3xl font-semibold font-family-helvetica -tracking-[1px]">Merken met karakter.</h3>
                <div class="pt-6 text-lg opacity-65 font-family-helvetica font-semibold flex flex-col gap-2">
                  <p>Logo, identiteit en visuele lijn.</p>
                  <p>Herkenbaar. Consistent.</p>
                  <p>Gebouwd om te blijven hangen.</p>
                </div>
              </div>
            </div>

            <div class="service-card absolute left-1/2 top-[28%] -translate-x-1/2 -translate-y-1/2 transform-gpu w-[30rem] h-[27rem] p-10 rounded-2xl bg-[#FEFF33] flex items-start justify-between flex-col rotate-3 shadow-xl will-change-transform pointer-events-auto" data-rot="4">
              <p class="text-xl font-semibold font-family-helvetica -tracking-[1px] uppercase rounded-2xl px-5 bg-[#1D1D21] py-2 text-white">VIDEOGRAFIE</p>
              <div class="text-[#1D1D21]">
                <h3 class="text-3xl font-semibold font-family-helvetica -tracking-[1px]">Verhalen in beeld.</h3>
                <div class="pt-6 text-lg opacity-65 font-family-helvetica font-semibold flex flex-col gap-2">
                  <p>Van concept tot eindproduct.</p>
                  <p>Visueel sterk. Emotioneel geladen.</p>
                  <p>Vertelt het verhaal van de klant.</p>
                </div>
              </div>
            </div>

            <div class="service-card absolute left-1/2 top-[28%] -translate-x-1/2 -translate-y-1/2 transform-gpu w-[30rem] h-[27rem] p-10 rounded-2xl bg-white flex items-start justify-between flex-col rotate-3 shadow-xl will-change-transform pointer-events-auto" data-rot="1">
              <p class="text-xl font-semibold font-family-helvetica -tracking-[1px] uppercase rounded-2xl px-5 bg-[#1D1D21] py-2 text-white">fotografie</p>
              <div class="text-[#1D1D21]">
                <h3 class="text-3xl font-semibold font-family-helvetica -tracking-[1px]">Verhalen in beeld.</h3>
                <div class="pt-6 text-lg opacity-65 font-family-helvetica font-semibold flex flex-col gap-2">
                  <p>Van concept tot eindproduct.</p>
                  <p>Visueel sterk. Emotioneel geladen.</p>
                  <p>Vertelt het verhaal van de klant.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutTheContainer>

      <img ref="bgRef" class="object-cover object-[50%_-12rem] w-full h-full absolute inset-0 grayscale-100 z-0 pointer-events-none will-change-transform" src="/images/other/camerafotoik.jpg" alt="">
      <div class="bg-black opacity-30 w-full h-full absolute inset-0 z-10 pointer-events-none"></div>
    </div>
  </div>
</template>
