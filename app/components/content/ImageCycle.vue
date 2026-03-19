<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

interface Props {
  images: string[];
  duration?: number | string;
  alt?: string;
  tall?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  duration: 2.5,
  alt: '',
  tall: false
})

const listRef = ref<HTMLElement | null>(null)

let intervalId: ReturnType<typeof setInterval> | null = null
let observer: IntersectionObserver | null = null
let timeoutIds: number[] = []

const cycleDuration = computed(() => {
  const parsed = Number(props.duration)
  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed * 1000
  }

  return 2000
})

const stopCycle = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

const clearPendingTimeouts = () => {
  timeoutIds.forEach((id) => clearTimeout(id))
  timeoutIds = []
}

onMounted(() => {
  const cycleElement = listRef.value
  if (!(cycleElement instanceof HTMLElement)) {
    return
  }

  const items = Array.from(cycleElement.querySelectorAll<HTMLElement>('[data-image-cycle-item]'))
  if (items.length < 2) {
    return
  }

  let currentIndex = 0
  const isTwoItems = items.length === 2

  items.forEach((item, index) => {
    item.setAttribute('data-image-cycle-item', index === 0 ? 'active' : 'not-active')
  })

  const cycleImages = () => {
    const previousIndex = currentIndex
    currentIndex = (currentIndex + 1) % items.length

    const previousItem = items[previousIndex]
    const currentItem = items[currentIndex]
    if (!previousItem || !currentItem) {
      return
    }

    previousItem.setAttribute('data-image-cycle-item', 'previous')

    if (!isTwoItems) {
      const timeoutId = window.setTimeout(() => {
        previousItem.setAttribute('data-image-cycle-item', 'not-active')
      }, cycleDuration.value)
      timeoutIds.push(timeoutId)
    }

    currentItem.setAttribute('data-image-cycle-item', 'active')
  }

  observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      if (!intervalId) {
        intervalId = setInterval(cycleImages, cycleDuration.value)
      }
      return
    }

    stopCycle()
  }, { threshold: 0 })

  observer.observe(cycleElement)
})

onUnmounted(() => {
  stopCycle()
  clearPendingTimeouts()

  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<template>
  <div class="image-cycle-collection" :class="{ 'image-cycle-collection--tall': tall }">
    <div class="image-cycle-collection__before" />

    <div
      ref="listRef"
      class="image-cycle-collection__list"
      :data-image-cycle="String(duration)"
    >
      <div
        v-for="(image, index) in images"
        :key="`${image}-${index}`"
        class="image-cycle-collection__item image-cycle-collection__img"
        data-image-cycle-item="not-active"
      >
        <img
          :src="image"
          loading="lazy"
          :alt="alt || `Cycle image ${index + 1}`"
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-cycle-collection {
  width: min(95vw, 60em);
  max-width: 100%;
  position: relative;
}

.image-cycle-collection__before {
  padding-top: 66.666%;
}

.image-cycle-collection--tall .image-cycle-collection__before {
  padding-top: 75%;
}

.image-cycle-collection__list {
  z-index: 0;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

.image-cycle-collection__item {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

[data-image-cycle-item='active'] {
  /* transition: opacity 0.4s ease 0s, visibility 0s ease 0s; */
  opacity: 1;
  visibility: visible;
  z-index: 3;
}

[data-image-cycle-item='previous'] {
  /* transition: opacity 0.4s ease 0.4s, visibility 0s ease 0.4s; */
  opacity: 0;
  visibility: visible;
  z-index: 2;
}

[data-image-cycle-item='not-active'] {
  opacity: 0;
  visibility: hidden;
  z-index: 1;
}

.image-cycle-collection__img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
}

.image-cycle-collection__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media screen and (max-width: 767px) {
  .image-cycle-collection__list {
    border-radius: 20px;
  }
}
</style>