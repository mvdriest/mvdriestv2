<template>
    <div ref="wrap" data-load-wrap class="loader">
      <div data-load-bg class="loader__bg">
        <div data-load-progress class="loader__bg-bar"></div>
      </div>
  
      <div data-load-container class="loader__container">
        <div class="loader__logo-wrap">
          <!-- Base logo -->
          <div class="loader__logo-item is--base">
            <svg xmlns="http://www.w3.org/2000/svg" width="97.357" height="54.19" viewBox="0 0 97.357 54.19">
              <g id="Group_10491" data-name="Group 10491" transform="translate(-9.387 -9.387)">
                <path id="Path_680" data-name="Path 680" d="M167.393,118.713l-5.511-5.512-2.756,2.756-13.177,13.177-5.651,5.651-7.334-7.334-1.516-1.516-9.978-9.978-2.756-2.756-5.511,5.511,2.749,2.748.007.008,21.584,21.583.008.007,2.749,2.748,2.755-2.756,2.756-2.756,5.651-5.651,13.177-13.177Z" transform="translate(-82.232 -82.231)" fill="#feff33"/>
                <path id="Path_681" data-name="Path 681" d="M131.882,61.621l-2.756-2.756L113.054,42.793,110.3,40.037l-2.756-2.756-2.756,2.756L87.361,57.463l-1.4,1.4L71.052,43.957l-1.165-1.165-2.756-2.756-2.756-2.756L61.62,40.037,46.3,55.352l-3.513,3.513-2.756,2.756-2.756,2.756,2.756,2.756L61.62,88.715l2.756,2.756,5.511-5.511L67.131,83.2,48.3,64.376l3.513-3.513L64.376,48.3l1.165,1.165L83.2,67.132l2.756,2.756,2.756-2.756,2.756-2.756,1.4-1.4L107.543,48.3l16.072,16.072L104.787,83.2l-2.756,2.756,5.511,5.511,2.756-2.756,21.584-21.584,2.756-2.756Z" transform="translate(-27.893 -27.895)" fill="#feff33"/>
              </g>
            </svg>

          </div>

          <!-- Revealed logo -->
          <div
            data-load-logo
            class="loader__logo-item is--top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="97.357" height="54.19" viewBox="0 0 97.357 54.19">
              <g id="Group_10491" data-name="Group 10491" transform="translate(-9.387 -9.387)">
                <path id="Path_680" data-name="Path 680" d="M167.393,118.713l-5.511-5.512-2.756,2.756-13.177,13.177-5.651,5.651-7.334-7.334-1.516-1.516-9.978-9.978-2.756-2.756-5.511,5.511,2.749,2.748.007.008,21.584,21.583.008.007,2.749,2.748,2.755-2.756,2.756-2.756,5.651-5.651,13.177-13.177Z" transform="translate(-82.232 -82.231)" fill="#feff33"/>
                <path id="Path_681" data-name="Path 681" d="M131.882,61.621l-2.756-2.756L113.054,42.793,110.3,40.037l-2.756-2.756-2.756,2.756L87.361,57.463l-1.4,1.4L71.052,43.957l-1.165-1.165-2.756-2.756-2.756-2.756L61.62,40.037,46.3,55.352l-3.513,3.513-2.756,2.756-2.756,2.756,2.756,2.756L61.62,88.715l2.756,2.756,5.511-5.511L67.131,83.2,48.3,64.376l3.513-3.513L64.376,48.3l1.165,1.165L83.2,67.132l2.756,2.756,2.756-2.756,2.756-2.756,1.4-1.4L107.543,48.3l16.072,16.072L104.787,83.2l-2.756,2.756,5.511,5.511,2.756-2.756,21.584-21.584,2.756-2.756Z" transform="translate(-27.893 -27.895)" fill="#feff33"/>
              </g>
            </svg>
          </div>
        </div>
  
        <div class="loader__text-wrap">
          <span data-load-text data-load-reset class="loader__text-el">Hold tight</span>
          <span data-load-text data-load-reset class="loader__text-el">Hi there!</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { gsap } from "gsap"
  import { CustomEase } from "gsap/CustomEase"
  import { SplitText } from "gsap/SplitText"
  import { onMounted, onBeforeUnmount, ref } from "vue"
  
  gsap.registerPlugin(CustomEase, SplitText)
  
  const wrap = ref(null)
  const emit = defineEmits(['done'])
  const texts = ["Hold tight", "Hi there!"]
  
  let ctx
  
  onMounted(() => {
    if (!wrap.value) return
  
    CustomEase.create("loader", "0.65, 0.01, 0.05, 0.99")
  
    ctx = gsap.context(() => {
      const container = wrap.value.querySelector("[data-load-container]")
      const bg = wrap.value.querySelector("[data-load-bg]")
      const progressBar = wrap.value.querySelector("[data-load-progress]")
      const logo = wrap.value.querySelector("[data-load-logo]")
      const textElements = Array.from(
        wrap.value.querySelectorAll("[data-load-text]")
      )
  
      const loadTimeline = gsap.timeline({
        defaults: {
          ease: "loader",
          duration: 3
        },
        onComplete: () => {
          emit("done")
        }
      })
  
      loadTimeline
        .set(wrap.value, { display: "block" })
        .to(progressBar, { scaleX: 1 })
        .to(logo, { clipPath: "inset(0% 0% 0% 0%)" }, "<")
        .to(container, { autoAlpha: 0, duration: 0.5 })
        .to(
          progressBar,
          { scaleX: 0, transformOrigin: "right center", duration: 0.5 },
          "<"
        )
        .add("hideContent", "<")
        .to(bg, { yPercent: -101, duration: 1 }, "hideContent")
        .set(wrap.value, { display: "none" })
  
      // Text animation
      if (textElements.length >= 2) {
        const first = new SplitText(textElements[0], {
          type: "lines,chars",
          mask: "lines"
        })
  
        const second = new SplitText(textElements[1], {
          type: "lines,chars",
          mask: "lines"
        })
  
        gsap.set([first.chars, second.chars], {
          autoAlpha: 0,
          yPercent: 125
        })
  
        gsap.set(textElements, { autoAlpha: 1 })
  
        loadTimeline.to(
          first.chars,
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.6,
            stagger: { each: 0.02 }
          },
          0
        )
  
        loadTimeline.to(
          first.chars,
          {
            autoAlpha: 0,
            yPercent: -125,
            duration: 0.4,
            stagger: { each: 0.02 }
          },
          ">+=0.4"
        )
  
        loadTimeline.to(
          second.chars,
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.6,
            stagger: { each: 0.02 }
          },
          "<"
        )
  
        loadTimeline.to(
          second.chars,
          {
            autoAlpha: 0,
            yPercent: -125,
            duration: 0.4,
            stagger: { each: 0.02 }
          },
          "hideContent-=0.5"
        )
      }
    }, wrap.value)
  })
  
  onBeforeUnmount(() => {
    ctx?.revert()
  })
  </script>
  