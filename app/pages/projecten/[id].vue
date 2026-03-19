<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()
const { data } = await useAsyncData('page-data', () => queryCollection('projecten').path(`/projecten/${route.params.id?.toString() ?? ''}`).first())

const pageRef = ref<HTMLElement | null>(null)
const heroRef = ref<HTMLElement | null>(null)
const heroMediaRef = ref<HTMLElement | null>(null)
const heroCopyRef = ref<HTMLElement | null>(null)
const heroTitleRef = ref<HTMLElement | null>(null)
const heroDescriptionRef = ref<HTMLElement | null>(null)
const heroTagsRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

let gsapContext: gsap.Context | null = null
let onWindowLoad: (() => void) | null = null

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

const initScrollExperience = () => {
  const hero = heroRef.value
  const heroMedia = heroMediaRef.value
  const heroCopy = heroCopyRef.value
  const heroTitle = heroTitleRef.value
  const heroDescriptionEl = heroDescriptionRef.value
  const heroTags = heroTagsRef.value
  const content = contentRef.value

  if (!(hero instanceof HTMLElement) || !(heroMedia instanceof HTMLElement) || !(heroCopy instanceof HTMLElement) || !(content instanceof HTMLElement)) {
    return
  }

  const introTargets = [heroTitle, heroDescriptionEl, heroTags].filter((element): element is HTMLElement => element instanceof HTMLElement)

  gsap.set(heroMedia, { willChange: 'transform, opacity, filter', opacity: 0 })
  gsap.set(heroCopy, { willChange: 'transform, opacity' })
  gsap.set(introTargets, { y: 36, opacity: 0 })

  const heroIntroDuration = 1.05

  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .fromTo(heroMedia, {
      opacity: 0,
      scale: 1.08,
      filter: 'blur(6px)'
    }, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: heroIntroDuration
    }, 0)
    .to(introTargets, {
      y: 0,
      opacity: 1,
      duration: heroIntroDuration
    }, 0)

  const revealTargets = Array.from(content.querySelectorAll<HTMLElement>('.split-row, section, h2, p'))

  revealTargets.forEach((target) => {
    gsap.from(target, {
      y: 20,
      opacity: 0,
      duration: 0.55,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: target,
        start: 'top 94%',
        toggleActions: 'play none none none'
      }
    })
  })
}

onMounted(async () => {
  await nextTick()

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  gsapContext = gsap.context(() => {
    initScrollExperience()
  }, pageRef)

  ScrollTrigger.refresh()

  onWindowLoad = () => {
    ScrollTrigger.refresh()
  }

  window.addEventListener('load', onWindowLoad, { once: true })
})

onUnmounted(() => {
  if (gsapContext) {
    gsapContext.revert()
    gsapContext = null
  }

  if (onWindowLoad) {
    window.removeEventListener('load', onWindowLoad)
    onWindowLoad = null
  }
})
</script>

<template>
  <section ref="pageRef" class="bg-gray-200">
    <div v-if="!data">
      <p>Article {{ route.params.id?.toString() ?? '' }} niet gevonden</p>
    </div>
    <div
      v-else
    > 
      <div ref="heroRef" class="w-full h-137.5 relative">
      <div ref="heroMediaRef" class="absolute inset-0 overflow-hidden rounded-b-3xl">
        <nuxt-img class="h-full w-full object-cover grayscale" :src="`/images/projecten/${data.projectAssetsDir}/header.jpg`" />
        <div class="hero-overlay absolute inset-0" />
      </div>
      <LayoutTheContainer class="flex items-end justify-start h-full">
        <div ref="heroCopyRef" class="hero-copy absolute bottom-8 md:bottom-10 z-10 max-w-4xl">
          <h1 ref="heroTitleRef" class="hero-title uppercase text-4xl leading-snug md:text-7xl 2xl:text-8xl font-bold text-left text-primary-600 md:leading-18 2xl:leading-[5.8rem] -tracking-[4px]">
            {{ data.title }}
          </h1>

          <p
            v-if="heroDescription"
            ref="heroDescriptionRef"
            class="mt-4 text-2xl font-semibold text-left text-white max-w-2xl font-family-helvetica -tracking-[1px]"
          >
            {{ heroDescription }}
          </p>

          <div v-if="data.tags?.length" ref="heroTagsRef" class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="tag in data.tags"
              :key="tag"
              class="inline-flex items-center rounded-full border border-white/35 bg-black/55 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary-600 backdrop-blur"
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
      <LayoutTheContainer class="project-content mt-10 md:mt-14 py-24">
        <div ref="contentRef" class="project-content__inner px-0">
          <ContentRenderer
            class="px-0"
            :value="data"
          />
        </div>
      </LayoutTheContainer>
    </div>
    <CTA />
  </section>
</template>

<style scoped>
.hero-overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.82) 12%, rgba(0, 0, 0, 0.4) 42%, rgba(0, 0, 0, 0.1) 100%);
  pointer-events: none;
}

/* .hero-copy {
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
} */

.project-content {
  color: var(--color-dark-600);
}

.project-content :deep(h1),
.project-content :deep(h2),
.project-content :deep(h3) {
  font-family: var(--font-family-sans);
  color: var(--color-dark-600);
  letter-spacing: -0.02em;
}

.project-content :deep(h1) {
  font-size: clamp(2.25rem, 4vw, 3.75rem);
  line-height: 1.02;
  margin: 0 0 1.5rem;
}

.project-content :deep(h2) {
  font-size: clamp(2rem, 3vw, 3.2rem);
  line-height: 1.05;
  margin: 0 0 1rem;
  font-weight: 600;
  max-width: 440px;
}

.project-content :deep(.case-row) {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 6rem;
}

.project-content :deep(.case-row-title h1),
.project-content :deep(.case-row-title h2) {
  margin: 0;
}

.project-content :deep(.case-row-body) {
  font-family: var(--font-family-helvetica);
  max-width: 33rem;
}

.project-content :deep(.case-row-body p) {
  margin: 0;
  max-width: 33rem;
}

.project-content :deep(.case-row-body p + p) {
  margin-top: 0.85rem;
}

.project-content :deep(.case-text-lg),
.project-content :deep(.case-text-md),
.project-content :deep(.case-text-sm),
.project-content :deep(p.case-text-lg),
.project-content :deep(p.case-text-md),
.project-content :deep(p.case-text-sm) {
  font-family: var(--font-family-helvetica);
  max-width: 33rem;
  letter-spacing: calc(1px * -1);
  margin: 0;
  opacity: 1;
}

.project-content :deep(.case-text-md ul),
.project-content :deep(.case-text-sm ul) {
  margin: 0.6rem 0 0;
  padding-left: 1.2rem;
  list-style: disc;
}

.project-content :deep(.case-text-md li),
.project-content :deep(.case-text-sm li) {
  margin-top: 0.22rem;
}

.project-content :deep(.case-text-lg),
.project-content :deep(p.case-text-lg) {
  font-size: 2.0rem;
  line-height: 1.12;
  font-weight: 700;
  color: var(--color-dark-600);
  margin-bottom: 1.15rem;
}

.project-content :deep(.case-text-md),
.project-content :deep(p.case-text-md) {
  font-size: 1.2rem;
  line-height: 1.3;
  font-weight: 600;
  color: var(--color-dark-600);
  margin-bottom: 1rem;
}

.project-content :deep(.case-text-sm),
.project-content :deep(p.case-text-sm) {
  font-size: 1.2rem;
  line-height: 1.3;
  font-weight: 600;
  color: var(--color-dark-600);
  opacity: 0.7;
}

.project-content :deep(.case-media) {
  margin-bottom: 2.8rem;
}

.project-content :deep(.case-media-grid) {
  display: grid;
  gap: 0.9rem;
  grid-template-columns: 1fr;
}

.project-content :deep(.case-kpis) {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1fr;
  margin-top: 1.2rem;
}

.project-content :deep(.case-kpi) {
  border-radius: 0.6rem;
  background: #fff;
  color: var(--color-dark-600);
  font-family: var(--font-family-helvetica);
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.35;
  padding: 1.5rem;
}

.project-content :deep(.case-kpi--orange) {
  background: #FA650A;
  color: #fff !important;
}

.project-content :deep(.case-kpi--blue) {
  background: #1746F9;
  color: #fff;
}

.project-content :deep(.case-kpi--orange .case-text-lg),
.project-content :deep(.case-kpi--orange .case-text-md),
.project-content :deep(.case-kpi--orange .case-text-sm),
.project-content :deep(.case-kpi--blue .case-text-lg),
.project-content :deep(.case-kpi--blue .case-text-md),
.project-content :deep(.case-kpi--blue .case-text-sm) {
  color: #fff !important;
}

.project-content :deep(.case-kpi .case-text-lg),
.project-content :deep(.case-kpi .case-text-md),
.project-content :deep(.case-kpi .case-text-sm) {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}

.project-content :deep(p) {
  font-family: var(--font-family-helvetica);
  font-size: clamp(1rem, 1.12vw, 1.16rem);
  line-height: 1.52;
  max-width: 33rem;
  color: var(--color-dark-600);
  margin: 0 0 1rem;
  font-weight: 500;
  --tw-tracking: calc(1px * -1);
  letter-spacing: calc(1px * -1);
}

.project-content :deep(.max-w-2xl) {
  max-width: 72ch;
  margin-bottom: 2.75rem;
}

@media (min-width: 1024px) {
  .project-content :deep(.case-row) {
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
    gap: 2.5rem;
  }

  .project-content :deep(.case-row-title) {
    flex: 0 1 44%;
  }

  .project-content :deep(.case-row-body) {
    flex: 0 1 46%;
  }

  .project-content :deep(.case-text-lg) {
    max-width: 38rem;
  }

  .project-content :deep(.case-text-md),
  .project-content :deep(.case-text-sm) {
    max-width: 36rem;
  }

  .project-content :deep(.case-row--spaced) {
    margin-top: 6rem;
  }

  .project-content :deep(.case-kpis) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .project-content :deep(.case-media-grid) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .project-content :deep(.case-media-grid > .case-media-span-2) {
    grid-column: span 2 / span 2;
  }
}
</style>
