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
    class="draggable-marquee"
  >
    <div data-draggable-marquee-collection class="draggable-marquee__collection">
      <div data-draggable-marquee-list class="draggable-marquee__list">
        <div class="draggable-marquee__item">
          <img
            draggable="false"
            loading="eager"
            src="/images/other/utrecht1.jpg"
            class="draggable-marquee__item-img"
            alt=""
          />
        </div>
        <div class="draggable-marquee__item">
          <img
            draggable="false"
            loading="eager"
            src="/images/other/sanne.jpg"
            class="draggable-marquee__item-img"
            alt=""
          />
        </div>
        <div class="draggable-marquee__item">
          <img
            draggable="false"
            loading="eager"
            src="/images/other/aamockup.jpg"
            class="draggable-marquee__item-img"
            alt=""
          />
        </div>
        <div class="draggable-marquee__item">
          <img
            draggable="false"
            loading="eager"
            src="/images/other/ikfoto.jpg"
            class="draggable-marquee__item-img"
            alt=""
          />
        </div>
        <div class="draggable-marquee__item">
          <img
            draggable="false"
            loading="eager"
            src="/images/other/utrecht2.jpg"
            class="draggable-marquee__item-img"
            alt=""
          />
        </div>
        <div class="draggable-marquee__item">
          <img
            draggable="false"
            loading="eager"
            src="https://cdn.prod.website-files.com/694b0fb876617b13bea76eb8/694bc0b7b75b2b06a7e51ec3_marquee-fruit-6.avif"
            class="draggable-marquee__item-img"
            alt=""
          />
        </div>
        <div class="draggable-marquee__item">
          <img
            draggable="false"
            loading="eager"
            src="https://cdn.prod.website-files.com/694b0fb876617b13bea76eb8/694bc0b866f40e1da7eb53ba_marquee-fruit-7.avif"
            class="draggable-marquee__item-img"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.draggable-marquee {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: none;
  width: 100%;
  overflow: hidden;
}

.draggable-marquee__collection {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: none;
  will-change: transform;
}

.draggable-marquee__list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: none;
}

.draggable-marquee__item {
  width: 21em;
  aspect-ratio: 0.7;
  border-radius: 1.25em;
  margin-right: 1em;
  flex: none;
  overflow: hidden;
}

.draggable-marquee__item.is--round {
  border-radius: 100em;
}

.draggable-marquee__item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

