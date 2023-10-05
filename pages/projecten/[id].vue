<script lang="ts" setup>
const route = useRoute()
const { data } = await useAsyncData('page-data', () => queryContent('projecten', route.params.id.toString()).findOne())
</script>

<template>
  <section class="bg-dark-600">
    <div v-if="!data">
      <p>Article {{ route.params.id.toString() }} niet gevonden</p>
    </div>
    <div
      v-else
    >
      <div>
        <nuxt-img class="h-[450px] w-full object-cover" :src="`/images/projecten/${data.projectAssetsDir}/header.jpg`" />
      </div>
      <LayoutTheContainer class="prose prose-invert lg:prose-xl prose-h1:text-5xl lg:prose-h1:text-8xl prose-h1:mb-0 lg:prose-h1:mb-0">
        <ContentRenderer
          class="py-24 px-0"
          :value="data"
        />
      </LayoutTheContainer>
    </div>
  </section>
</template>
