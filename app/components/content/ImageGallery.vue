<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
    images: string[];
    gallery: string;
    baseDir: string;
  layout?: 'split' | 'single' | 'single-tall' | 'two-up' | 'three-up';
    tight?: boolean;
}

const props = defineProps<Props>()

const galleryImages = computed(() => props.images ?? [])
const galleryLayout = computed(() => props.layout ?? 'split')

const resolveImageSrc = (image: string) => {
  if (image.startsWith('/') || image.startsWith('http://') || image.startsWith('https://')) {
    return image
  }

  return `/images/projecten/${props.baseDir}/${props.gallery}/${image}`
}
</script>

<template>
  <section class="overflow-hidden py-0">
    <div v-if="galleryLayout === 'split'" class="grid grid-cols-1 gap-3 md:gap-4">
      <div v-if="galleryImages[0]" class="w-full">
        <nuxt-img
          alt="gallery"
          class="block aspect-video h-full w-full rounded-[20px] object-cover object-center"
          :src="resolveImageSrc(galleryImages[0])"
          format="webp"
        />
      </div>

      <div class="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
        <div v-for="(image, key) in galleryImages.slice(1, 3)" :key="`${image}-${key}`" class="w-full">
          <nuxt-img
            alt="gallery"
            class="block aspect-square h-full w-full rounded-[20px] object-cover object-center"
            :src="resolveImageSrc(image)"
            format="webp"
          />
        </div>
      </div>
    </div>

    <div v-else-if="galleryLayout === 'single' && galleryImages[0]" class="w-full">
      <nuxt-img
        alt="gallery"
        class="block aspect-16/7 h-full w-full rounded-[20px] object-cover object-center"
        :src="resolveImageSrc(galleryImages[0])"
        format="webp"
      />
    </div>

    <div v-else-if="galleryLayout === 'single-tall' && galleryImages[0]" class="w-full">
      <nuxt-img
        alt="gallery"
        class="block aspect-4/3 h-full w-full rounded-[20px] object-cover object-center"
        :src="resolveImageSrc(galleryImages[0])"
        format="webp"
      />
    </div>

    <div v-else-if="galleryLayout === 'two-up'" class="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
      <div v-for="(image, key) in galleryImages.slice(0, 2)" :key="`${image}-${key}`" class="w-full">
        <nuxt-img
          alt="gallery"
          class="block aspect-4/3 h-full w-full rounded-[20px] object-cover object-center"
          :src="resolveImageSrc(image)"
          format="webp"
        />
      </div>
    </div>

    <div v-else-if="galleryLayout === 'three-up'" class="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
      <div v-for="(image, key) in galleryImages.slice(0, 3)" :key="`${image}-${key}`" class="w-full">
        <nuxt-img
          alt="gallery"
          class="block aspect-3/4 h-full w-full rounded-[20px] object-cover object-center"
          :src="resolveImageSrc(image)"
          format="webp"
        />
      </div>
    </div>
  </section>
</template>
