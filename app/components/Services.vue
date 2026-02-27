<template>
  <section data-bg-zoom-init class="background-zoom">
    <!-- Title removed per request; spacer kept to preserve scroll timing so the background zoom reaches fullscreen at the same moment -->
    <div class="background-zoom__spacer" aria-hidden="true"></div>
    <div data-bg-zoom-start class="background-zoom__start">
      <div data-bg-zoom-content class="background-zoom__content">
        <img width="1440" data-bg-zoom-img alt="Futuristic Pod Vehicle name Podrick" src="https://cdn.prod.website-files.com/6943c8b7a3a82b904e7497bd/6943c8e062a0c0a68d04e6c1_futuristic-pod-vehicle.avif" loading="lazy" class="background-zoom__img">
        <p class="background-zoom__pod">PØDRICK</p>
        <div class="background-zoom__play">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewbox="0 0 66 66" fill="none" class="background-zoom__play-svg"><circle cx="33" cy="33" r="33" fill="#F4F4F4"></circle><path d="M25.5 33V26.0785C25.5 24.1544 27.5826 22.9515 29.2493 23.9131L35.25 27.375L41.2465 30.8345C42.9141 31.7966 42.9141 34.2034 41.2465 35.1655L35.25 38.625L29.2493 42.0869C27.5826 43.0485 25.5 41.8456 25.5 39.9215V33Z" fill="#201D1D"></path></svg>
        </div>
        <div data-bg-zoom-dark class="background-zoom__dark"></div>
      </div>
    </div>
    <div data-bg-zoom-end class="background-zoom__end"></div>
    <div class="background-zoom__text">
      <h2 class="background-zoom__h">This is the after phase of the <br><span class="background-zoom__h1-span">(Zoom)</span></h2>
      <h2 class="background-zoom__h is--margin-top">more...</h2>
      <h2 class="background-zoom__h is--margin-top">and more!</h2>
    </div>
  </section>
  <section class="background-zoom-after">
    <p class="background-zoom-after__pod">PØDRICK</p>
    <h2 class="background-zoom__h">And we reached the end!</h2>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

// Load external script helper
function loadScript(src) {
  return new Promise((resolve, reject) => {
    // If already loaded, resolve
    const existing = Array.from(document.scripts).find(s => s.src === src || s.getAttribute('data-src') === src);
    if (existing) {
      if (existing.getAttribute('data-loaded') === 'true') return resolve(existing);
      existing.addEventListener('load', () => resolve(existing));
      existing.addEventListener('error', () => reject(new Error('Failed to load ' + src)));
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = false;
    s.setAttribute('data-src', src);
    s.addEventListener('load', () => { s.setAttribute('data-loaded','true'); resolve(s); });
    s.addEventListener('error', () => reject(new Error('Failed to load ' + src)));
    document.head.appendChild(s);
  });
}

let resizeHandler = null;
let masterTimeline = null;
let resizeTimeout = null;

function initBackgroundZoom() {
  // Ensure gsap and plugins exist
  const gw = window;
  const gsap = gw.gsap;
  const ScrollTrigger = gw.ScrollTrigger;
  const Flip = gw.Flip;
  if (!gsap || !ScrollTrigger || !Flip) return;

  gsap.registerPlugin(ScrollTrigger, Flip);

  const containers = document.querySelectorAll('[data-bg-zoom-init]');
  if (!containers.length) return;

  const getScrollRange = ({ trigger, start, endTrigger, end }) => {
    const st = ScrollTrigger.create({ trigger, start, endTrigger, end });
    const range = Math.max(1, st.end - st.start);
    st.kill();
    return range;
  };

  const bgZoomTimeline = () => {
    if (masterTimeline) {
      try { masterTimeline.kill(); } catch (e) { /* ignore */ }
    }

    masterTimeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: containers[0].querySelector('[data-bg-zoom-start]') || containers[0],
        start: 'clamp(top bottom)',
        endTrigger: containers[containers.length - 1],
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    containers.forEach((container) => {
      const startEl = container.querySelector('[data-bg-zoom-start]');
      const endEl = container.querySelector('[data-bg-zoom-end]');
      const contentEl = container.querySelector('[data-bg-zoom-content]');
      const darkEl = container.querySelector('[data-bg-zoom-dark]');
      const imgEl = container.querySelector('[data-bg-zoom-img]');
      if (!startEl || !endEl || !contentEl) return;

      const startRadius = getComputedStyle(startEl).borderRadius;
      const endRadius = getComputedStyle(endEl).borderRadius;
      const hasRadius = startRadius !== '0px' || endRadius !== '0px';
      contentEl.style.overflow = hasRadius ? 'hidden' : '';
      if (hasRadius) gsap.set(contentEl, { borderRadius: startRadius });

      // Ensure Flip.fit initial layout
      Flip.fit(contentEl, startEl, { scale: false });

      const zoomScrollRange = getScrollRange({
        trigger: startEl,
        start: 'clamp(top bottom)',
        endTrigger: endEl,
        end: 'center center'
      });

      const afterScrollRange = getScrollRange({
        trigger: endEl,
        start: 'center center',
        endTrigger: container,
        end: 'bottom top'
      });

      masterTimeline.add(
        Flip.fit(contentEl, endEl, {
          duration: zoomScrollRange,
          ease: 'none',
          scale: false
        })
      );

      if (hasRadius) {
        masterTimeline.to(contentEl, { borderRadius: endRadius, duration: zoomScrollRange }, '<');
      }

      masterTimeline.to(contentEl, { y: `+=${afterScrollRange}`, duration: afterScrollRange });

      if (darkEl) {
        gsap.set(darkEl, { opacity: 0 });
        masterTimeline.to(darkEl, { opacity: 0.75, duration: afterScrollRange * 0.25 }, '<');
      }

      if (imgEl) {
        gsap.set(imgEl, { scale: 1, transformOrigin: '50% 50%' });
        masterTimeline.to(imgEl, { scale: 1.25, yPercent: -10, duration: afterScrollRange }, '<');
      }
    });

    ScrollTrigger.refresh();
  };

  bgZoomTimeline();

  // debounce resize
  resizeHandler = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(bgZoomTimeline, 100);
  };
  window.addEventListener('resize', resizeHandler);
}

onMounted(async () => {
  if (typeof window === 'undefined') return;

  try {
    if (!window.gsap) {
      await loadScript('https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js');
    }
    if (!window.Flip) {
      await loadScript('https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/Flip.min.js');
    }
    if (!window.ScrollTrigger) {
      await loadScript('https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/ScrollTrigger.min.js');
    }
    // small delay to ensure scripts have registered globals
    await new Promise(r => setTimeout(r, 20));
    initBackgroundZoom();
  } catch (e) {
    // silent fail
  }
});

onBeforeUnmount(() => {
  try {
    if (masterTimeline) {
      masterTimeline.kill();
      masterTimeline = null;
    }
    if (window && window.ScrollTrigger && typeof window.ScrollTrigger.getAll === 'function') {
      window.ScrollTrigger.getAll().forEach((st) => st.kill());
    }
    window.removeEventListener('resize', resizeHandler);
    clearTimeout(resizeTimeout);
  } catch (e) { /* ignore */ }
});
</script>

<style scoped>
.background-zoom {
  color: #f4f4f4;
  background-color: #353d35;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  min-height: 100svh;
  padding-top: calc(50dvh - 15em);
  padding-left: 1em;
  padding-right: 1em;
  display: flex;
  overflow: clip;
}

/* Spacer preserves vertical space for scroll timing when the visible title is removed */
.background-zoom__spacer {
  width: 100%;
  /* fixed vertical footprint requested by user */
  height: 36em;
}

.background-zoom__h {
  text-align: center;
  letter-spacing: -.04em;
  max-width: 7em;
  margin-top: 0;
  margin-bottom: -.375em;
  font-family: Haffer XH, Arial, sans-serif;
  font-size: 7.5em;
  font-weight: 400;
  line-height: .95;
}

.background-zoom__h.is--margin-top {
  margin-top: 33dvh;
}

.background-zoom__h1-span {
  color: #aba994;
}

.background-zoom__start {
  aspect-ratio: 1;
  border-radius: 16em;
  width: 16em;
  position: relative;
}

.background-zoom__content {
  border-radius: inherit;
  will-change: width, height, transform;
  background-color: #aba994;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
  overflow: hidden;
}

.background-zoom__img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
}

.background-zoom__pod {
  color: #ff4800;
  text-align: center;
  letter-spacing: -.02em;
  width: 100%;
  font-size: 1.25em;
  font-weight: 900;
  line-height: 1;
  position: absolute;
  top: 1.25em;
}

.background-zoom__play {
  width: 4em;
  height: 4em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.background-zoom__play-svg {
  width: 100%;
}

.background-zoom__dark {
  opacity: 0;
  background-color: #0d0f0d;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.background-zoom__end {
  width: 100vw;
  height: 100dvh;
}

.background-zoom__text {
  grid-column-gap: 2em;
  grid-row-gap: 2em;
  flex-flow: column;
  align-items: center;
  width: 100%;
  padding-bottom: calc(50dvh - 12em);
  display: flex;
  position: relative;
}

.background-zoom-after {
  color: #353d35;
  font-size: var(--size-font);
  background-color: #f4f4f4;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100dvh;
  padding-left: 1em;
  padding-right: 1em;
  display: flex;
  position: relative;
}

.background-zoom-after__pod {
  color: #ff4800;
  text-align: center;
  letter-spacing: -.02em;
  width: 100%;
  font-size: 1.25em;
  font-weight: 900;
  line-height: 1;
  position: absolute;
  bottom: 1.25em;
}

@media screen and (max-width: 767px) {
  .background-zoom__h {
    font-size: 3.75em;
  }
}
</style>