<script lang="ts" setup>
const route = useRoute();
const { data } = await useAsyncData('page-data', () => queryContent('projecten', route.params.id.toString()).findOne())
</script>

<template>
  <main>
    <div v-if="!data">
      <p>Article {{ route.params.id.toString() }} niet gevonden</p>
    </div>
    <div
      v-else
      class="bg-"
    >
      <div>
        <nuxt-img :src="`/images/projecten/${data.projectAssetsDir}/header.jpg`" />
      </div>
      <LayoutContainer class="prose lg:prose-xl prose-h1:text-5xl lg:prose-h1:text-8xl prose-h1:mb-0 lg:prose-h1:mb-0">
        <ContentRenderer
          :value="data"
          class=""
        />
      </LayoutContainer>
    </div>
  </main>
</template>