<script setup lang="ts">
interface Props {
  to: string,
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
