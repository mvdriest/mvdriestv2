<script lang="ts" setup>
const contentQuery = await queryContent('projecten').limit(6).find()
</script>

<template>
  <div class="slidersection flex flex-nowrap overflow-hidden gap-[15px]">
    <div class="list flex gap-[15px] flex-[0_0_auto]">
      <nuxt-link
        v-for="post in contentQuery"
        :key="post._id"
        :to="post._path"
        tag="div"
        class="list-item relative group cursor-pointer w-[300px] md:w-[550px] h-[70vh] md:h-[80vh] float-left bg-[#303030] min-h-[1px] overflow-hidden"
      >
        <div
          class="card bg-[#f5ff00] absolute w-full h-full bottom-0 left-0 right-0 top-0 flex flex-col justify-center items-center -translate-x-full group-hover:translate-x-0 transition duration-300"
        >
          <h1
            class="max-w-md font-semibold text-center text-4xl leading-relaxed"
          >
            Bekijk project
          </h1>
          <p>{{ post.title }}</p>
        </div>
        <nuxt-img
          class="w-full h-full object-cover"
          :src="`/images/projecten/${post.projectAssetsDir}/header.jpg`"
          :alt="post.title ?? 'project'"
        />
        <p />
        <p>{{ post.title }}</p>
      </nuxt-link>
    </div>
    <div class="list flex gap-[15px] flex-[0_0_auto]">
      <nuxt-link
        v-for="post in contentQuery"
        :key="post._id"
        :to="post._path"
        tag="div"
        class="list-item relative group cursor-pointer w-[300px] md:w-[550px] h-[70vh] md:h-[80vh] float-left bg-[#303030] min-h-[1px] overflow-hidden"
      >
        <div
          class="card bg-[#f5ff00] absolute w-full h-full bottom-0 left-0 right-0 top-0 flex flex-col justify-center items-center -translate-x-full group-hover:translate-x-0 transition duration-300"
        >
          <h1
            class="max-w-md font-semibold text-center text-4xl leading-relaxed"
          >
            Bekijk project
          </h1>
          <p>{{ post.title }}</p>
        </div>
        <nuxt-img
          class="w-full h-full object-cover"
          :src="`/images/projecten/${post.projectAssetsDir}/header.jpg`"
          :alt="post.title ?? 'project'"
        />
        <p />
        <p>{{ post.title }}</p>
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  animation: 50s slide linear infinite;
}

.slidersection:hover {
  animation-play-state: paused;
}

@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - 15px));
  }
}
</style>
