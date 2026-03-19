<script lang="ts" setup>
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { onMounted, onUnmounted, watch, ref } from "vue"
import DraggableMarquee from "~/components/DraggableMarquee.vue"
import Service from '~/components/Service.vue'

const skills = [
  'Webdesign',
  'Branding',
  'Video Editing',
  'Webdevelopment',
  'Design'
]

import { ScrollTrigger } from "gsap/ScrollTrigger"
import CTA from "~/components/CTA.vue"
import AboutMe from "~/components/AboutMe.vue"

gsap.registerPlugin(SplitText, ScrollTrigger)

const title = ref(null)
const loaderFinished = useState('loaderFinished')

let split: any = null
let hasAnimated = false

// refs
const servicesRef = ref<HTMLElement | null>(null)
const bgRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

const animate = () => {
  if (hasAnimated) return
  hasAnimated = true

  split?.revert?.()
  split = new SplitText(title.value, {
    type: "chars"
  })

  gsap.from(split.chars, {
    yPercent: 120,
    opacity: 0,
    stagger: 0.03,
    duration: 0.8,
    ease: "power3.out"
  })
}

watch(loaderFinished, (finished) => {
  console.log("Loader status:", finished)

  if (finished) {
    console.log("START ANIMATION")
    animate()
  }
})

const initIntroductionAnimation = () => {
  const introSection = document.querySelector('#introduction')
  if (!introSection) return

  const titleEl = introSection.querySelector('h1')
  const descEl = introSection.querySelector('p')
  const cameraImg = introSection.querySelector('nuxt-img, img[src*="camera"]')

  if (!titleEl) return

  // Split title into words
  const titleSplit = new SplitText(titleEl, { type: 'words' })
  const descSplit = descEl ? new SplitText(descEl, { type: 'words' }) : null

  // Create animation timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: introSection,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1,
      markers: false
    }
  })

  // Title words: stagger in from below with rotation
  tl.fromTo(
    titleSplit.words,
    {
      yPercent: 80,
      opacity: 0,
      rotation: -8
    },
    {
      yPercent: 0,
      opacity: 1,
      rotation: 0,
      stagger: 0.04,
      ease: 'power3.out'
    },
    0
  )

  // Camera image: scale up and fade in with subtle filter blur effect
  if (cameraImg) {
    tl.fromTo(
      cameraImg,
      {
        scale: 0.85,
        opacity: 0,
        filter: 'blur(4px)'
      },
      {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'power2.out'
      },
      0
    )
  }

  // Description words: fade in with slight stagger
  if (descSplit) {
    tl.fromTo(
      descSplit.words,
      {
        opacity: 0,
        yPercent: 10
      },
      {
        opacity: 1,
        yPercent: 0,
        stagger: 0.02,
        ease: 'power2.out'
      },
      0.15
    )
  }

  // Subtle parallax effect on entire section content during scroll
  tl.to(
    introSection.querySelector('[class*="flex flex-col"]'),
    {
      yPercent: -8,
      ease: 'none'
    },
    0
  )
}

onMounted(() => {
  if (loaderFinished.value) {
    animate()
  }

  // Initialize introduction section animation
  initIntroductionAnimation()

  const el = servicesRef.value
  const container = containerRef.value
  if (!(el instanceof HTMLElement) || !(container instanceof HTMLElement)) return

  const cards = el.querySelectorAll<HTMLElement>('.service-card')
  if (!cards.length) return

  // ensure stacking order: later cards on top
  cards.forEach((c, i) => {
    c.style.zIndex = `${200 + i}`
  })

  const scrollDuration = () => window.innerHeight * (cards.length + 0.8)

  // make container tall enough to provide scroll space for the pinned animation
  const setContainerHeight = () => {
    const total = scrollDuration()
    // increase buffer so the pinned area fully covers the animation and avoids extra page scroll
    container.style.minHeight = `${total + window.innerHeight * 2}px`
  }

  setContainerHeight()

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: () => `+=${scrollDuration()}`,
      scrub: 0.9,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1
    }
  })

  // compute mid index for nice spread
  const midIndex = (cards.length - 1) / 2

  // set initial per-card state based on data-rot (final rotation) and larger initial offset
  cards.forEach((el, i) => {
    const finalRot = parseFloat((el.dataset.rot as string) || '0')
    const initialRot = finalRot + (i - midIndex) * 18
    gsap.set(el, { y: 220, opacity: 0, scale: 0.98, rotation: initialRot, transformOrigin: '50% 50%' })
  })

  // reveal: each card 'floats in' one-by-one to its final rotation
  tl.to(cards, {
    y: 0,
    opacity: 1,
    scale: 1,
    rotation: (i, el) => parseFloat(((el as HTMLElement).dataset.rot as string) || '0'),
    duration: 0.9,
    ease: 'power4.out',
    stagger: { each: 0.7, from: 'start' }
  }, 0)

  // after reveal, tuck into a tight stacked pile
  tl.to(cards, {
    y: (i) => 8 * i,
    x: (i) => 6 * i,
    rotation: (i) => (i - midIndex) * 3,
    duration: 0.6,
    stagger: 0.06,
    ease: 'power2.out'
  }, '+=0.25')

  // subtle parallax for background during the whole pinned scroll
  const bgEl = bgRef.value
  if (bgEl) {
    gsap.set(bgEl, { y: 0 })
    // reduce parallax so the image doesn't feel like it's scrolling away
    tl.to(bgEl, {
      yPercent: -6,
      ease: 'none'
    }, 0)

    // ensure bg stays fixed while pinned
    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: () => `+=${scrollDuration()}`,
      onEnter: () => gsap.set(bgEl, { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }),
      onEnterBack: () => gsap.set(bgEl, { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }),
      onLeave: () => gsap.set(bgEl, { position: 'absolute', inset: '0' }),
      onLeaveBack: () => gsap.set(bgEl, { position: 'absolute', inset: '0' })
    })
  }

  // ensure only the top-most card is interactive
  const topIdx = cards.length - 1
  cards.forEach((c, i) => c.style.pointerEvents = i === topIdx ? 'auto' : 'none')

  // refresh + resize handling (unchanged)
  ScrollTrigger.refresh()

  const onResize = () => {
    setContainerHeight()
    ScrollTrigger.refresh()
  }
  window.addEventListener('resize', onResize)

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(st => st.kill())
  gsap.killTweensOf('*')
})
</script>

<template>
  <div class="page overflow-x-hidden">
    <div id="top" data-progress-nav-anchor>
      <TheHeader />
    </div>
    <section
      id="introduction"
      data-progress-nav-anchor
      class="py-36 bg-gray-200 relative"
    >
      <LayoutTheContainer> 
        <div class="flex flex-col items-center gap-12 text-dark-800">
          <h1 class="text-7xl uppercase font-bold max-w-[66rem] leading-tight text-center">Ik ben <br/>jouw <span class="h-fit">   <nuxt-img
            class="-mt-4 w-32 h-fit inline-block align-middle -ml-4 mr-1"
            src="/images/other/camera.png"
            alt="Star"
          /></span>allround <br/> creative.</h1>
          <p class="text-2xl font-semibold text-center max-w-2xl font-family-helvetica -tracking-[1px] opacity-70">Ik geloof in een wereld waar sterke websites, cinematische video, krachtige fotografie en consistente branding je merk laten opvallen zoals het verdient.</p>
        </div>
        <div>
        </div>
      </LayoutTheContainer>
      <DraggableMarquee class="pt-36" />
    </section>
    <!-- <div
      id="concept"
      data-progress-nav-anchor
      class="textslider"
    >
      <div v-for="wrapper in 2" :key="wrapper" class="textwrapper">
        <template v-for="(skill, index) in skills" :key="index">
          <p>{{ skill }}</p>
          <nuxt-img
            class="mx-8 -mt-1"
            src="/images/other/Star.svg"
            alt="Star"
          />
        </template>
      </div>
      <div v-for="wrapper in 2" :key="wrapper" class="textwrapper">
        <template v-for="(skill, index) in skills" :key="index">
          <p>{{ skill }}</p>
          <nuxt-img
            class="mx-8 -mt-1"
            src="/images/other/Star.svg"
            alt="Star"
          />
        </template>
      </div>
    </div> -->
    <!-- <section
      id="product"
      data-progress-nav-anchor
    >
      <HomeSectionsServicesSection class="py-[150px]" />
    </section> -->
    <section
      id="concept"
      data-progress-nav-anchor
      class="py-36"
    >
      <ProjectGrid :limit="4" />
    </section>
    <div>
      
    </div>
    <AboutMe />
    <!-- Services component -->
     <!-- <Services /> -->
     <!-- <Service id="service" data-progress-nav-anchor /> -->
     <FullscreenStackCards />
    <CTA />
    <div id="bottom" data-progress-nav-anchor />
  </div>
</template>

<style lang="scss" scoped>

.page {
  background-color: #111216;
}

.infosection {
  padding: 150px 0px;
  display: grid;
  gap: 100px;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  div {
    position: relative;
    img {
      object-fit: cover;
      width: 100%;
      max-width: 600px;
    }
  }
  h1 {
    max-width: 650px;
    color: #fff;
    font-weight: 600;
    line-height: 62px;
    span {
      color: #f5ff00;
    }
  }
}
@media only screen and (max-width: 1400px) {
  .infosection {
    gap: 50px;
  }
}
@media only screen and (max-width: 1100px) {
  .infosection {
    flex-direction: column;
    grid-template-columns: 1fr;
    div {
      img {
        max-width: 100%;
      }
    }
  }
}
.dot {
  width: 10px;
  height: 10px;
  margin-right: 25px;
  margin-left: 25px;
  border-radius: 20px;
  background-color: #000;
}
.textslider {
  background-color: #f5ff00;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 30px;
  flex-wrap: nowrap;
  transform: rotate(-3deg);
  .textwrapper {
    display: flex;
    animation: 40s slide linear infinite;
    align-items: center;
    flex: 0 0 auto;
    p {
      direction: ltr;
      font-family: Sora, sans-serif;
      font-size: 40px;
      font-weight: 700;
      text-transform: uppercase;
      white-space: normal;
    }
  }
}
@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
