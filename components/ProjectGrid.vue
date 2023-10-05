<script lang="ts" setup>
type Props = {
  limit: number
}

const props = withDefaults(defineProps<Props>(), {
  limit: 6
})

const contentQuery = await queryContent('projecten').limit(props.limit).find()
</script>

<template>
  <LayoutTheContainer>
    <div class="grid grid-cols-1 gap-y-[60px] md:[&>*:nth-child(even)]:mt-[60px] md:grid-cols-2 md:gap-x-10">
      <nuxt-link v-for="post in contentQuery" :key="post._id" :to="post._path" tag="div" class="relative flex flex-col bg-[#111216]">
        <div class="w-full overflow-hidden group relative h-[300px] md:h-[500px]">
          <div class="card bg-[#f5ff00] absolute w-full h-full bottom-0 left-0 right-0 top-0 flex justify-center items-center -translate-x-full group-hover:translate-x-0 transition duration-300">
            <h1 class="max-w-md font-semibold text-center text-4xl leading-relaxed">
              Bekijk project
            </h1>
          </div>
          <nuxt-img
            class="w-full h-[300px] object-cover md:h-[500px]"
            :src="`/images/projecten/${post.projectAssetsDir}/header.jpg`"
            :alt="post.title ?? 'project'"
          />
        </div>
        <div class="mt-[30px]">
          <p class="text-primary-600 flex gap-4 flex-wrap">
            <span v-for="tag in post.tags" :key="tag">
              {{ tag }}
            </span>
          </p>
          <h1 class="text-white text-[35px] font-semibold">
            {{ post.title }}
          </h1>
        </div>
      </nuxt-link>
    </div>
  </LayoutTheContainer>
</template>
