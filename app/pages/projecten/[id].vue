<script lang="ts" setup>
const route = useRoute()
const { data } = await useAsyncData('page-data', () => queryCollection('projecten').path(`/projecten/${route.params.id?.toString() ?? ''}`).first())

const extractFirstText = (value: unknown): string => {
  if (!value) {
    return ''
  }

  if (typeof value === 'string') {
    return value.trim()
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const text = extractFirstText(item)
      if (text) {
        return text
      }
    }
    return ''
  }

  if (typeof value === 'object') {
    const node = value as { value?: unknown, children?: unknown }

    if (typeof node.value === 'string' && node.value.trim()) {
      return node.value.trim()
    }

    if (node.children) {
      return extractFirstText(node.children)
    }
  }

  return ''
}

const heroDescription = computed(() => {
  if (!data.value) {
    return ''
  }

  const metadata = data.value as unknown as Record<string, unknown>

  const description = [
    metadata.description,
    metadata.excerpt,
    metadata.summary,
    metadata.intro
  ].find((text) => typeof text === 'string' && text.trim())

  if (description) {
    return description
  }

  return extractFirstText(data.value.body)
})
</script>

<template>
  <section class="bg-gray-200">
    <div v-if="!data">
      <p>Article {{ route.params.id?.toString() ?? '' }} niet gevonden</p>
    </div>
    <div
      v-else
    > 
      <div class="w-full h-[50lvh] relative">
      <nuxt-img class="absolute inset-0 h-full w-full object-cover grayscale" :src="`/images/projecten/${data.projectAssetsDir}/header.jpg`" />
      <LayoutTheContainer class="flex items-end justify-start h-full">
        <div class="absolute bottom-8 md:bottom-10 z-10 max-w-4xl">
          <h1 ref="title" class="hero-title uppercase text-4xl leading-snug md:text-7xl 2xl:text-8xl font-bold text-left text-primary-600 md:leading-[4.5rem] 2xl:leading-[5.8rem] -tracking-[4px]">
            {{ data.title }}
          </h1>

          <p
            v-if="heroDescription"
            class="mt-4 text-sm md:text-base max-w-2xl text-primary-600 font-family-helvetica"
          >
            {{ heroDescription }}
          </p>

          <div v-if="data.tags?.length" class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="tag in data.tags"
              :key="tag"
              class="inline-flex items-center rounded-full border border-primary-600/70 bg-black/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary-600 backdrop-blur"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </LayoutTheContainer>
    </div>
      <div>
        <!-- <nuxt-img class="h-[450px] w-full object-cover" :src="`/images/projecten/${data.projectAssetsDir}/header.jpg`" /> -->
      </div>
      <LayoutTheContainer class="prose text-dark-600 prose-invert lg:prose-xl prose-h1:text-5xl lg:prose-h1:text-8xl prose-h1:mb-0 lg:prose-h1:mb-0">
        <ContentRenderer
          class="py-24 px-0"
          :value="data"
        />
      </LayoutTheContainer>
    </div>
  </section>
</template>
