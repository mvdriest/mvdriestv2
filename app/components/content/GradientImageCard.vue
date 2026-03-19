<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'

interface Props {
  src: string;
  alt?: string;
  cycleImages?: string[];
  duration?: number | string;
  gradientFrom?: string;
  gradientTo?: string;
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  cycleImages: () => [],
  duration: 2.5,
  gradientFrom: '#FA650A',
  gradientTo: '#1746F9'
})

const currentIndex = ref(0)
let intervalId: ReturnType<typeof setInterval> | null = null

const imageSources = computed(() => {
  if (props.cycleImages.length > 0) {
    return props.cycleImages
  }

  return [props.src]
})

const cycleDuration = computed(() => {
  const parsed = Number(props.duration)
  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed * 1000
  }

  return 2500
})

const innerStyle = computed<CSSProperties>(() => ({
  '--gradient-from': props.gradientFrom,
  '--gradient-to': props.gradientTo
}))

onMounted(() => {
  if (imageSources.value.length < 2) {
    return
  }

  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % imageSources.value.length
  }, cycleDuration.value)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
})
</script>

<template>
  <div class="gradient-image-card">
    <div class="gradient-image-card__inner" :style="innerStyle">
      <nuxt-img
        v-for="(image, index) in imageSources"
        :key="`${image}-${index}`"
        :src="image"
        :alt="alt"
        :class="['gradient-image-card__image', { 'gradient-image-card__image--active': index === currentIndex }]"
        format="webp"
      />
    </div>
  </div>
</template>

<style scoped>
.gradient-image-card {
  width: 100%;
}

.gradient-image-card__inner {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 8;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    var(--gradient-from, #FA650A) 0%,
    var(--gradient-to, #1746F9) 100%
  );
}

.gradient-image-card__image {
  position: absolute;
  left: 15%;
  right: 15%;
  bottom: 0;
  width: 70%;
  height: auto;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 18px 40px rgba(17, 18, 22, 0.3);
  object-fit: cover;
  opacity: 0;
  /* transition: opacity 0.45s ease; */
}

.gradient-image-card__image--active {
  opacity: 1;
}

@media (max-width: 767px) {
  .gradient-image-card__inner {
    border-radius: 20px;
  }

  .gradient-image-card__image {
    left: 8%;
    right: 8%;
    width: 84%;
  }
}
</style>