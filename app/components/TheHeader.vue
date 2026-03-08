<script setup>
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ref, watch, nextTick, onMounted } from "vue"

gsap.registerPlugin(SplitText, ScrollTrigger)

const title = ref(null)
const heroSection = ref(null)
const loaderFinished = useState('loaderFinished')

let split
let hasAnimated = false

const animate = async () => {
  await nextTick()

  if (hasAnimated) return
  hasAnimated = true

  split?.revert?.()
  split = new SplitText(title.value, {
    type: "words"
  })

  gsap.set(title.value, { opacity: 1 }) 

  gsap.from(split.words, {
    yPercent: 100,
    opacity: 0,
    stagger: 0.08,
    duration: 0.8,
    ease: "power3.out"
  })
}

const initHeroPadding = () => {
  if (!heroSection.value) return

  const video = heroSection.value.querySelector('video')
  const overlay = heroSection.value.querySelector('.overlay-dark')

  if (!video || !overlay) return

  // Sync both video and overlay with same timeline
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection.value,
      start: "top top",
      end: "150% center",
      scrub: 1,
      markers: false
    }
  })

  timeline.fromTo([video, overlay], 
    {
      transform: "scale(1)",
      borderRadius: "0rem",
      top: "0",
      left: "0"
    },
    {
      transform: "scale(0.92)",
      borderRadius: "2rem",
      top: "2rem",
      left: "2rem",
      ease: "none"
    },
    0 // same time
  )

  // Add padding to section for bg color to show
  timeline.fromTo(heroSection.value,
    {
      padding: "0rem"
    },
    {
      padding: "2rem",
      ease: "none"
    },
    0 // same time
  )
}

onMounted(() => {
  initHeroPadding()
})

watch(loaderFinished, (finished) => {
  if (finished) {
    animate()
  }
})
</script>

<template>
  <section ref="heroSection" class="relative h-dvh">
    <div class="relative flex items-end z-20 h-full">
      <LayoutTheContainer>
        <div class="flex items-end justify-start h-full relative z-10 mb-16">
          <div>
            <div class="flex gap-4 items-center">
              <div class="backdrop-blur-3xl px-3 py-2 w-fit backdrop-brightness-200 rounded-md">
                <p class="text-xl text-white font-semibold font-family-helvetica -tracking-[1px] uppercase">Video</p>
              </div>
              <div class="backdrop-blur-3xl px-3 py-2 w-fit backdrop-brightness-200 rounded-md">
                <p class="text-xl text-white font-semibold font-family-helvetica -tracking-[1px] uppercase">Foto</p>
              </div>
              <div class="backdrop-blur-3xl px-3 py-2 w-fit backdrop-brightness-200 rounded-md">
                <p class="text-xl text-white font-semibold font-family-helvetica -tracking-[1px] uppercase">Web</p>
              </div>
              <div class="backdrop-blur-3xl px-3 py-2 w-fit backdrop-brightness-150 rounded-md">
                <p class="text-xl text-white font-semibold font-family-helvetica -tracking-[1px] uppercase">Branding</p>
              </div>
            </div>
            <h1 ref="title" class="hero-title text-4xl max-w-3xl leading-snug md:text-8xl font-bold text-left text-primary-600 mt-8 md:leading-[5.8rem] z-10 -tracking-[4px]">
              Jouw merk is 
              te cool voor standaard. 
            </h1>
            <!-- <p class="text-white max-w-md leading-relaxed text-center m-auto">
              Hallo! Mijn naam is Martijn van Driest. Aangenaam kennis te maken. Ik ben een Grafisch Ontwerper uit Nederland.
            </p> -->
          </div>
        </div>
      </LayoutTheContainer>
    </div>
    <div class="absolute top-0 bg-black h-full w-full opacity-20 z-10 overlay-dark" />
    <video aria-hidden="true" class="absolute top-0 left-0 w-full h-full object-cover z-0" autoplay muted loop playsinline preload="auto">
      <source src="/images/other/achtergrond.mp4" type="video/mp4" />
      <!-- fallback image if video not supported -->
      <img src="/images/other/Auto-Atlas-Laptop.jpg" alt="" />
    </video>
    <!-- <div class="bg-[url('~/assets/image/Auto-Atlas-Laptop.jpg')] bg-cover bg-no-repeat h-[60rem] -mt-12 w-fullx">
      <div class="bg-black h-full w-full opacity-20 z-0" />
    </div> -->
  </section>
</template>

<style lang="scss" scoped>

section {
  background-color: var(--color-gray-200);
}

.hero-title {
  opacity: 0;
}

.ani{
  animation: slide 10s steps(8) infinite;
  overflow: hidden;
  transition-timing-function: ease-in-out;
}
.animb{
  animation: slidemb 10s steps(8) infinite;
  overflow: hidden;
  transition-timing-function: ease-in-out;
  @media (min-width: 768px) {
    animation: slide 10s steps(8) infinite;
  }
}
@keyframes slide {
  100%{
    margin-top: -600px;
  }
}
@keyframes slidemb {
  100%{
    margin-top: -396px;
  }
}
</style>
