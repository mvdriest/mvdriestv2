<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'

interface Props {
  to: RouteLocationRaw,
}

const props = defineProps<Props>()
</script>

<template>
  <NuxtLink :to="props.to" class="bg-primary btn bg-primary">
    <div class="btn_label">
      <div class="btn_label--wrapper">
        <div class="btn_label--item">
          <slot />
        </div>
        <div class="btn_label--item">
          <slot />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.btn{
  background-color: #f5ff00;
  padding: 30px 60px;
  text-decoration: none;
  color: #000000;
  cursor: pointer;
  &_label {
    height: 30px;
    overflow-y: hidden;
    line-height: 30px;
    &--wrapper {
      transition: .2s ease-in-out;
    }
  }
}

.btn:hover {
  .btn_label {
    &--wrapper {
      transform: translateY(-30px);
    }
  }
}
</style>
