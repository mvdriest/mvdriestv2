<script setup>
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { ref, watch, nextTick } from "vue"

gsap.registerPlugin(SplitText)

const title = ref(null)
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

watch(loaderFinished, (finished) => {
  if (finished) {
    animate()
  }
})
</script>

<template>
  <section class="relative h-dvh" >
    <div class="relative flex items-end z-20 h-full">
      <LayoutTheContainer>
        <div class="flex items-end justify-start h-full relative z-10 mb-16">
          <div>
            <div class="flex gap-4 items-center">
              <div class="backdrop-blur-3xl px-3 py-2 w-fit backdrop-brightness-650 rounded-md">
                <p class="text-white uppercase">Video</p>
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
    <div class="absolute top-0 bg-black h-full w-full opacity-20  z-10" />
    <img class="absolute top-0 w-full h-full object-cover z-0" src="/images/other/Auto-Atlas-Laptop.jpg" alt=""/> 
    <!-- <div class="bg-[url('~/assets/image/Auto-Atlas-Laptop.jpg')] bg-cover bg-no-repeat h-[60rem] -mt-12 w-fullx">
      <div class="bg-black h-full w-full opacity-20 z-0" />
    </div> -->
  </section>
</template>

<style lang="scss" scoped>

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
