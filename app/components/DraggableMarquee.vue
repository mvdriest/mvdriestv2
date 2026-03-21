<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";

type CleanupFn = () => void;

const cleanupFns: CleanupFn[] = [];

onMounted(async () => {
  // Dynamic import to keep things SSR-safe
  const { gsap } = await import("gsap");
  const { Observer } = await import("gsap/Observer");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");

  gsap.registerPlugin(Observer, ScrollTrigger);

  initDraggableMarquee(gsap, Observer, ScrollTrigger);
});

onBeforeUnmount(() => {
  cleanupFns.forEach((fn) => fn());
});

function initDraggableMarquee(gsap: any, Observer: any, ScrollTrigger: any) {
  const wrappers = document.querySelectorAll<HTMLElement>("[data-draggable-marquee-init]");

  const getNumberAttr = (el: HTMLElement, name: string, fallback: number) => {
    const value = parseFloat(el.getAttribute(name) || "");
    return Number.isFinite(value) ? value : fallback;
  };

  wrappers.forEach((wrapper) => {
    if (wrapper.getAttribute("data-draggable-marquee-init") === "initialized") return;

    const collection = wrapper.querySelector<HTMLElement>("[data-draggable-marquee-collection]");
    const list = wrapper.querySelector<HTMLElement>("[data-draggable-marquee-list]");
    if (!collection || !list) return;

    const duration = getNumberAttr(wrapper, "data-duration", 20);
    const multiplier = getNumberAttr(wrapper, "data-multiplier", 40);
    const sensitivity = getNumberAttr(wrapper, "data-sensitivity", 0.01);

    const wrapperWidth = wrapper.getBoundingClientRect().width;
    const listWidth = list.scrollWidth || list.getBoundingClientRect().width;
    if (!wrapperWidth || !listWidth) return;

    const minRequiredWidth = wrapperWidth + listWidth + 2;
    while (collection.scrollWidth < minRequiredWidth) {
      const listClone = list.cloneNode(true) as HTMLElement;
      listClone.setAttribute("data-draggable-marquee-clone", "");
      listClone.setAttribute("aria-hidden", "true");
      collection.appendChild(listClone);
    }

    const wrapX = gsap.utils.wrap(-listWidth, 0);

    gsap.set(collection, { x: 0 });

    const marqueeLoop = gsap.to(collection, {
      x: -listWidth,
      duration,
      ease: "none",
      repeat: -1,
      onReverseComplete: () => marqueeLoop.progress(1),
      modifiers: {
        x: (x: string) => `${wrapX(parseFloat(x))}px`,
      },
    });

    const initialDirectionAttr = (wrapper.getAttribute("data-direction") || "left").toLowerCase();
    const baseDirection = initialDirectionAttr === "right" ? -1 : 1;

    const timeScale = { value: 1 };

    timeScale.value = baseDirection;
    wrapper.setAttribute("data-direction", baseDirection < 0 ? "right" : "left");

    if (baseDirection < 0) marqueeLoop.progress(1);

    const applyTimeScale = () => {
      marqueeLoop.timeScale(timeScale.value);
      wrapper.setAttribute("data-direction", timeScale.value < 0 ? "right" : "left");
    };

    applyTimeScale();

    const marqueeObserver = Observer.create({
      target: wrapper,
      type: "pointer,touch",
      preventDefault: true,
      debounce: false,
      onChangeX: (observerEvent: { velocityX: number }) => {
        let velocityTimeScale = observerEvent.velocityX * -sensitivity;
        velocityTimeScale = gsap.utils.clamp(-multiplier, multiplier, velocityTimeScale);

        gsap.killTweensOf(timeScale);

        const restingDirection = velocityTimeScale < 0 ? -1 : 1;

        gsap
          .timeline({ onUpdate: applyTimeScale })
          .to(timeScale, { value: velocityTimeScale, duration: 0.1, overwrite: true })
          .to(timeScale, { value: restingDirection, duration: 1.0 });
      },
    });

    const scrollTrigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => {
        marqueeLoop.resume();
        applyTimeScale();
        marqueeObserver.enable();
      },
      onEnterBack: () => {
        marqueeLoop.resume();
        applyTimeScale();
        marqueeObserver.enable();
      },
      onLeave: () => {
        marqueeLoop.pause();
        marqueeObserver.disable();
      },
      onLeaveBack: () => {
        marqueeLoop.pause();
        marqueeObserver.disable();
      },
    });

    wrapper.setAttribute("data-draggable-marquee-init", "initialized");

    cleanupFns.push(() => {
      marqueeLoop.kill();
      marqueeObserver.kill();
      scrollTrigger.kill();
    });
  });
}
</script>

<template>
  <div
    data-draggable-marquee-init
    data-direction="left"
    data-duration="30"
    data-multiplier="35"
    data-sensitivity="0.01"
    class="flex w-full flex-none items-center justify-start overflow-hidden"
  >
    <div data-draggable-marquee-collection class="flex flex-none items-center justify-start will-change-transform">
      <div data-draggable-marquee-list class="flex flex-none items-center justify-start">
        <div class="mr-[1em] aspect-[0.7] w-[15em] md:w-[21em] flex-none overflow-hidden rounded-[1.25em]">
          <img
            draggable="false"
            loading="lazy"
            decoding="async"
            src="/images/other/utrecht1.jpg"
            class="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div class="mr-[1em] aspect-[0.7] w-[15em] md:w-[21em] flex-none overflow-hidden rounded-[1.25em]">
          <img
            draggable="false"
            loading="lazy"
            decoding="async"
            src="/images/other/sanne.jpg"
            class="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div class="mr-[1em] aspect-[0.7] w-[15em] md:w-[21em] flex-none overflow-hidden rounded-[1.25em]">
          <img
            draggable="false"
            loading="lazy"
            decoding="async"
            src="/images/other/aamockup.jpg"
            class="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div class="relative mr-[1em] aspect-[0.7] w-[15em] md:w-[21em] flex-none overflow-hidden rounded-[1.25em]">
          <video
            draggable="false"
            data-autoplay-inline
            muted
            loop
            playsinline
            preload="metadata"
            width="336"
            height="480"
            class="h-full w-full object-cover"
          >
            <source src="/images/other/ajax_short.mp4" type="video/mp4" />
          </video>
          <div class="absolute inset-0 flex items-end justify-start p-4 pointer-events-none">
            <div class="flex items-center gap-2 px-3 py-2 rounded-full bg-white text-black font-bold text-xs shadow-lg">
              <span>250k+ views</span>
            </div>
          </div>
        </div>
        <div class="mr-[1em] aspect-[0.7] w-[15em] md:w-[21em] flex-none overflow-hidden rounded-[1.25em]">
          <img
            draggable="false"
            loading="lazy"
            decoding="async"
            src="/images/other/ikfoto.jpg"
            class="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div class="mr-[1em] aspect-[0.7] w-[15em] md:w-[21em] flex-none overflow-hidden rounded-[1.25em]">
          <img
            draggable="false"
            loading="lazy"
            decoding="async"
            src="/images/other/utrecht2.jpg"
            class="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div class="relative mr-[1em] aspect-[0.7] w-[15em] md:w-[21em] flex-none overflow-hidden rounded-[1.25em]">
          <video
            draggable="false"
            data-autoplay-inline
            muted
            loop
            playsinline
            preload="metadata"
            width="336"
            height="480"
            class="h-full w-full object-cover"
          >
            <source src="/images/other/xpeng_short.mp4" type="video/mp4" />
          </video>
          <div class="absolute inset-0 flex items-start justify-end p-4 pointer-events-none">
            <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-black/85 text-white font-bold text-sm shadow-lg border border-white/20">
              <span>⭐</span>
              <span>14k+ weergaven</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

