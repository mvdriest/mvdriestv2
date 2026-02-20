<script lang="ts" setup>
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { onMounted, watch, ref } from "vue"
import DraggableMarquee from "~/components/DraggableMarquee.vue"

const skills = [
  'Webdesign',
  'Branding',
  'Video Editing',
  'Webdevelopment',
  'Design'
]

gsap.registerPlugin(SplitText)

const title = ref(null)
const loaderFinished = useState('loaderFinished')

let split
let hasAnimated = false

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

onMounted(() => {
  if (loaderFinished.value) {
    animate()
  }
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
            class=" -mt-1 w-32 h-fit inline-block align-middle -ml-4 mr-1 -3 -mt-4"
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
