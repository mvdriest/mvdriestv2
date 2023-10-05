<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'

interface Props {
  to: RouteLocationRaw,
}

const props = defineProps<Props>()
</script>

<template>
  <NuxtLink :to="props.to" class="bg-primary-600 group px-16 py-8 no-underline text-black cursor-pointer">
    <div class="h-8 overflow-y-hidden leading-8">
      <div class="group-hover:-translate-y-8 transition ease-in-out">
        <div v-for="index in 2" :key="index">
          <slot />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
