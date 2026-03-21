<script lang="ts" setup>
type Props = {
  limit: number
}

const props = withDefaults(defineProps<Props>(), {
  limit: 6
})

const { data: contentQuery } = await useAsyncData('projecten-all', () =>
  queryCollection('projecten').all()
)

const projects = computed(() => {
  const items = contentQuery.value ?? []

  const sorted = [...items].sort((a: any, b: any) => {
    const aOrder = Number.isFinite(a?.gridOrder) ? Number(a.gridOrder) : Number.MAX_SAFE_INTEGER
    const bOrder = Number.isFinite(b?.gridOrder) ? Number(b.gridOrder) : Number.MAX_SAFE_INTEGER

    if (aOrder !== bOrder)
      return aOrder - bOrder

    const aTitle = String(a?.title ?? '')
    const bTitle = String(b?.title ?? '')
    return aTitle.localeCompare(bTitle)
  })

  return sorted.slice(0, props.limit)
})

const cardLayoutClass = (index: number) => {
  // 3 kolommen grid volgens schets:
  // Rij 1: Titel (kolom 1-2) + begin Project 2 (kolom 3)
  // Rij 2-4: Project 1 (kolom 1-2), Project 2 loopt door (kolom 3)
  // Rij 5-7: Project 4 (kolom 1) en Project 3 (kolom 2-3)
  switch (index) {
    case 0:
      // Project 1: links, 2 kolommen, 3 rijen (rij 2-4)
      return 'md:col-span-2 md:row-span-3 md:col-start-1 md:row-start-2'
    case 1:
      // Project 2: hele rechterkolom, 4 rijen hoog (rij 1-4)
      return 'md:col-span-1 md:row-span-4 md:col-start-3 md:row-start-1'
    case 2:
      // Project 3: rechts onder, 2 kolommen, 3 rijen (rij 4-6)
      return 'md:col-span-2 md:row-span-3 md:col-start-2 md:row-start-5'
    case 3:
      // Project 4: links onder, 1 kolom, 3 rijen (rij 4-6)
      return 'md:col-span-1 md:row-span-3 md:col-start-1 md:row-start-5'
    default:
      // Extra projecten: volledige breedte daaronder
      return 'md:col-span-3 md:row-span-1'
  }
}
</script>

<template>
  <LayoutTheContainer>
    <div class="grid grid-cols-1 gap-[24px] md:grid-cols-3 md:auto-rows-[120px]">
      <div class="md:col-span-2 flex items-end">
        <h1 class="text-5xl md:text-7xl font-semibold uppercase text-primary-600">
          Een selectie Mijn van werk.
        </h1>
      </div>

      <nuxt-link
        v-for="(post, index) in projects"
        :key="post.id"
        :to="post.path"
        tag="div"
        :class="[
          'relative rounded-[1.25em] overflow-hidden bg-dark-600 group',
          cardLayoutClass(index)
        ]"
      >
        <nuxt-img
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          :src="`/images/projecten/${post.projectAssetsDir}/header.jpg`"
          :alt="post.title ?? 'project'"
        />

        <div class="pointer-events-none absolute inset-0">
          <div
            class="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-dark-600/65 to-transparent"
          />
          <div
            class="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-dark-600/70 to-transparent"
          />
        </div>

        <div
          class="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6"
        >
          <h2 class="text-white text-[24px] md:text-[26px] font-semibold max-w-xs">
            {{ post.title }}
          </h2>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="inline-flex items-center rounded-full border border-white/60 bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white backdrop-blur"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </nuxt-link>
    </div>
  </LayoutTheContainer>
</template>
