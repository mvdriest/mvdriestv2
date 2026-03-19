<script setup lang="ts">
interface ShortItem {
  title: string
  views: string
  src: string
  href?: string
}

interface Props {
  items: ShortItem[]
}

defineProps<Props>()
</script>

<template>
  <div class="shorts-spotlight">
    <div class="shorts-spotlight__inner">
      <ShortsGrid :items="items" />
    </div>
  </div>
</template>

<style scoped>
.shorts-spotlight {
  display: flex;
  justify-content: center;
}

.shorts-spotlight__inner {
  width: 100%;
}

@media (min-width: 768px) {
  .shorts-spotlight {
    align-items: center;
    border-radius: 28px;
    background: var(--color-dark-700);
    padding: 5rem 6rem;
  }

  .shorts-spotlight__inner {
    max-width: 320px;
  }
}

:deep(.shorts-grid) {
  grid-template-columns: 1fr !important;
  justify-items: center;
}

:deep(.short-card) {
  margin-inline: auto;
}
</style>
