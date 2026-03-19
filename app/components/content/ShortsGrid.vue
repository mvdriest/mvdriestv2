<script setup lang="ts">
interface ShortItem {
  title: string;
  views: string;
  src: string;
  href?: string;
}

interface Props {
  items: ShortItem[];
}

defineProps<Props>()
</script>

<template>
  <div class="shorts-grid">
    <a
      v-for="(item, index) in items"
      :key="`${item.title}-${index}`"
      :href="item.href || item.src"
      class="short-card"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="`Open short: ${item.title}`"
    >
      <video
        class="short-card__video"
        :src="item.src"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
      />

      <div class="short-card__icon" aria-hidden="true">
        <div data-button-anim-target class="short-card__icon-bg" />
        <div class="short-card__icon-wrap">
          <div data-button-anim-target class="short-card__icon-list">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 10 8" fill="none" data-button-anim-target class="short-card__icon-arrow"><path d="M4.45231 0.385986H6.02531L9.30131 3.99999L6.02531 7.61399H4.45231L7.40331 4.58499H0.695312V3.42799H7.41631L4.45231 0.385986Z" fill="currentColor" /></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 10 8" fill="none" data-button-anim-target class="short-card__icon-arrow"><path d="M4.45231 0.385986H6.02531L9.30131 3.99999L6.02531 7.61399H4.45231L7.40331 4.58499H0.695312V3.42799H7.41631L4.45231 0.385986Z" fill="currentColor" /></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 10 8" fill="none" data-button-anim-target class="short-card__icon-arrow"><path d="M4.45231 0.385986H6.02531L9.30131 3.99999L6.02531 7.61399H4.45231L7.40331 4.58499H0.695312V3.42799H7.41631L4.45231 0.385986Z" fill="currentColor" /></svg>
          </div>
        </div>
      </div>

      <div class="short-card__content">
        <p class="short-card__views">{{ item.views }}</p>
      </div>
    </a>
  </div>
</template>

<style scoped>
.shorts-grid {
  display: grid;
  gap: 0.9rem;
  grid-template-columns: 1fr;
}

.short-card {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 9 / 16;
  border-radius: 1.25rem;
  overflow: hidden;
  isolation: isolate;
  text-decoration: none;
}

.short-card__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.525s cubic-bezier(0.625, 0.05, 0, 1);
}

.short-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(17, 18, 22, 0.66) 14%, rgba(17, 18, 22, 0.18) 42%, rgba(17, 18, 22, 0.04) 100%);
}

.short-card__icon {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 9999px;
  color: #111216;
  display: grid;
  place-items: center;
  font-size: 1.7rem;
  line-height: 1;
  overflow: hidden;
}

.short-card__icon-bg {
  position: absolute;
  inset: 0;
  background: rgb(255, 255, 255);
}

.short-card__icon-wrap {
  --arrow-size: 1.15em;
  --arrow-gap: 0.45em;
  --arrow-step: calc(var(--arrow-size) + var(--arrow-gap));
  position: absolute;
  inset: 0;
  transform: rotate(-45deg);
  z-index: 1;
  overflow: hidden;
}

.short-card__icon-list {
  position: absolute;
  inset: 0;
}

.short-card__icon-arrow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--arrow-size);
  height: var(--arrow-size);
  padding: 0.08em;
  display: block;
  transform: translate(-50%, -50%) translateX(var(--arrow-offset));
}

.short-card__icon-arrow:nth-child(1) { --arrow-offset: 0px; }
.short-card__icon-arrow:nth-child(2) { --arrow-offset: calc(-1 * var(--arrow-step)); }
.short-card__icon-arrow:nth-child(3) { --arrow-offset: calc(-2 * var(--arrow-step)); }

[data-button-anim-target] {
  transition: transform 0.525s cubic-bezier(0.625, 0.05, 0, 1);
}

.short-card__content {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.5rem;
}

.short-card__views {
  display: inline-flex;
  margin: 1rem;
  margin-bottom: 0px !important;
  padding: 0.45rem 0.85rem;
  border-radius: 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.6);
  background: rgba(128, 128, 128, 0.26);
  color: #ffffff !important;
  backdrop-filter: blur(20px) brightness(0.5);
  font-family: var(--font-family-helvetica);
  font-size: 1rem;
  text-transform: uppercase;
  --tw-tracking: calc(1px * -1);
  letter-spacing: -1px;
  font-weight: 600 !important;
}

@media (hover: hover) and (pointer: fine) {
  .short-card:hover .short-card__icon-bg {
    transform: rotate(90deg);
  }

  .short-card:hover .short-card__icon-list {
    transform: none;
  }

  .short-card:hover .short-card__icon-arrow {
    transform: translate(-50%, -50%) translateX(calc(var(--arrow-offset) + var(--arrow-step)));
  }

  .short-card:hover .short-card__video {
    transform: scale(1.06);
  }
}

@media (min-width: 768px) {
  .shorts-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .short-card__icon {
    width: 3.7rem;
    height: 3.7rem;
    font-size: 1.9rem;
  }
}
</style>