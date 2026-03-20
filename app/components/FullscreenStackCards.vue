<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type StackCard = {
  title: string
  description: string
  alt: string
  backgroundColor: string
  chips: [string, string, string, string]
} & (
  | {
      kind: 'video'
      src: string
    }
  | {
      kind: 'images'
      images: string[]
    }
)

const getReadableTextColor = (backgroundColor: string) => {
  const normalized = backgroundColor.replace('#', '')
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return '#ffffff'

  const red = Number.parseInt(normalized.slice(0, 2), 16)
  const green = Number.parseInt(normalized.slice(2, 4), 16)
  const blue = Number.parseInt(normalized.slice(4, 6), 16)

  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255
  return luminance > 0.6 ? '#111111' : '#ffffff'
}

const getDescriptionColor = (backgroundColor: string) => {
  const textColor = getReadableTextColor(backgroundColor)
  return textColor === '#111111' ? 'rgba(17, 17, 17, 0.82)' : 'rgba(255, 255, 255, 0.9)'
}

const getChipStyle = (backgroundColor: string) => {
  const textColor = getReadableTextColor(backgroundColor)
  return textColor === '#111111'
    ? {
        color: '#111111',
        backgroundColor: 'rgba(17, 17, 17, 0.08)',
        borderColor: 'rgba(17, 17, 17, 0.2)'
      }
    : {
        color: '#ffffff',
        backgroundColor: 'rgba(255, 255, 255, 0.14)',
        borderColor: 'rgba(255, 255, 255, 0.28)'
      }
}

const cards: StackCard[] = [
  {
    title: 'VIDEO PRODUCTIE',
    description: 'Van social content tot cinematische merkfilms die blijven hangen.',
    alt: 'Video productie',
    backgroundColor: '#111216',
    chips: ['Concepting', 'Regie', 'Opname', 'Montage'],
    kind: 'video',
    src: '/images/other/porsche_short.mp4'
  },
  {
    title: 'FOTOGRAFIE',
    description: 'Sterke beelden met karakter, licht en compositie die je verhaal dragen.',
    alt: 'Fotografie',
    backgroundColor: '#FA7A2B',
    chips: ['Portret', 'Product', 'Event', 'Nabewerking'],
    kind: 'images',
    images: [
      '/images/other/sanne.jpg',
      '/images/other/sanne_stoelen.jpg',
      '/images/other/utrecht1.jpg',
      '/images/other/utrecht2.jpg'
    ]
  },
  {
    title: 'BRANDING',
    description: 'Een herkenbare visuele identiteit die overal klopt en vertrouwen opbouwt.',
    alt: 'Branding',
    backgroundColor: '#ffffff',
    chips: ['Logo design', 'Kleurenpalet', 'Typografie', 'Brand assets'],
    kind: 'images',
    images: [
      '/images/other/batavia_social.jpg',
      '/images/other/mockup_bord.jpg',
      '/images/other/FCUH-Mockup.jpg',
      '/images/other/mockup_businesscard.jpg',
      '/images/other/batavia_vlag.jpg'
    ]
  },
  {
    title: 'WEBDESIGN & DEVELOPMENT',
    description: 'Snelle, sterke websites die goed voelen en gericht zijn op resultaat.',
    alt: 'Webdesign en development',
    backgroundColor: '#f5ff00',
    chips: ['UX/UI design', 'Nuxt', 'CMS integratie', 'Performance'],
    kind: 'images',
    images: [
      '/images/other/aamockup.jpg',
      '/images/other/batavia_laptop.jpg',
      '/images/other/aa_mobiel.jpg',
      '/images/other/o2_laptop.jpg'
    ]
  }
]

const sectionRef = ref<HTMLElement | null>(null)
const cardsRef = ref<HTMLElement | null>(null)

let gsapContext: gsap.Context | null = null

const initStackCards = () => {
  const section = sectionRef.value
  const cardsContainer = cardsRef.value
  if (!(section instanceof HTMLElement) || !(cardsContainer instanceof HTMLElement)) return

  const cardEls = cardsContainer.querySelectorAll<HTMLElement>('[data-fullscreen-stack-card]')
  if (cardEls.length < 2) return

  cardEls.forEach((card, index) => {
    card.style.zIndex = `${100 + index}`
    gsap.set(card, {
      yPercent: index === 0 ? 0 : 118,
      rotate: index === 0 ? 0 : 2,
      scale: 1,
      force3D: true
    })
  })

  gsap.set(cardsContainer, { willChange: 'transform' })

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${window.innerHeight * (cardEls.length - 1) * 1.35}`,
      scrub: 0.45,
      snap: {
        snapTo: 1 / (cardEls.length - 1),
        duration: { min: 0.08, max: 0.22 },
        ease: 'power1.inOut'
      },
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  })

  for (let i = 1; i < cardEls.length; i++) {
    const previousCard = cardEls[i - 1]
    const currentCard = cardEls[i]
    if (!previousCard || !currentCard) continue

    timeline
      .to(previousCard, {
        scale: 0.965,
        duration: 0.62,
        ease: 'power2.out'
      })
      .to(currentCard, {
        yPercent: 0,
        rotate: 0,
        duration: 0.74,
        ease: 'power3.out'
      }, '<+0.04')
  }
}

onMounted(async () => {
  await nextTick()

  gsapContext = gsap.context(() => {
    initStackCards()
  }, sectionRef)

  ScrollTrigger.refresh()
})

onUnmounted(() => {
  if (gsapContext) {
    gsapContext.revert()
    gsapContext = null
  }
})
</script>

<template>
  <section ref="sectionRef" class="min-h-screen w-full bg-gray-200" data-progress-nav-anchor>
    <div class="relative h-screen w-full p-12.5 max-[991px]:p-8.75 max-[640px]:p-5">
      <div ref="cardsRef" class="relative h-full w-full">
        <article
          v-for="(card, index) in cards"
          :key="card.title"
          data-fullscreen-stack-card
          class="absolute inset-0 overflow-hidden rounded-[1.75rem] origin-center will-change-[transform,opacity] backface-hidden max-[640px]:rounded-2xl"
          :style="{ backgroundColor: card.backgroundColor }"
        >
          <LayoutTheContainer class="h-full px-0 py-10 md:py-24">

            <div class="flex flex-col md:flex-row gap-4 md:gap-8 justify-start md:justify-between z-2 h-full" :style="{ color: getReadableTextColor(card.backgroundColor) }">
              <div class="order-2 md:order-1 flex flex-col items-stretch flex-1 min-h-0 w-full md:w-auto max-w-full md:max-w-lg lg:max-w-xl h-full">
                <h2 class="z-50 text-4xl md:text-7xl uppercase font-bold max-w-200 leading-tight md:leading-18 text-left">{{ card.title }}</h2>

                <!-- Mobile: description under H2, then chips -->
                <div class="mt-4 md:hidden">
                  <p class="z-50 text-base font-semibold text-left max-w-88 font-family-helvetica -tracking-[1px]" :style="{ color: getDescriptionColor(card.backgroundColor) }">{{ card.description }}</p>
                  <ul class="mt-4 flex flex-wrap gap-2.5 max-w-96">
                    <li
                      v-for="chip in card.chips"
                      :key="`${card.title}-${chip}`"
                      class="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                      :style="getChipStyle(card.backgroundColor)"
                    >
                      {{ chip }}
                    </li>
                  </ul>
                </div>

                <!-- Desktop: keep chips above description at the bottom -->
                <div class="hidden md:block mt-auto">
                  <ul class="flex flex-wrap gap-2.5 max-w-96 md:max-w-md">
                    <li
                      v-for="chip in card.chips"
                      :key="`${card.title}-${chip}`"
                      class="rounded-full border px-3 py-1 text-xs md:text-sm font-semibold uppercase tracking-wide"
                      :style="getChipStyle(card.backgroundColor)"
                    >
                      {{ chip }}
                    </li>
                  </ul>
                  <p class="z-50 mt-4 text-base md:text-2xl font-semibold text-left max-w-88 md:max-w-96 font-family-helvetica -tracking-[1px] max-[640px]:max-w-[95%]" :style="{ color: getDescriptionColor(card.backgroundColor) }">{{ card.description }}</p>
                </div>
              </div>

              <div class="order-1 md:order-2 fullscreen-stack-cards__media">
                <template v-if="card.kind === 'video'">
                  <video
                    class="fullscreen-stack-cards__video w-full object-cover rounded-lg"
                    data-autoplay-inline
                    autoplay
                    muted
                    loop
                    playsinline
                    preload="metadata"
                    :key="card.src"
                  >
                    <source :src="card.src" type="video/mp4" />
                  </video>
                </template>

                <template v-else>
                  <ImageCycle
                    class="fullscreen-stack-cards__image-cycle"
                    :images="card.images"
                    :alt="card.alt"
                    portrait
                  />
                </template>
              </div>
            </div>
          </LayoutTheContainer>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fullscreen-stack-cards__media {
  width: clamp(10rem, 62vw, 14rem);
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-inline: 0;
}

@media (min-width: 768px) {
  .fullscreen-stack-cards__media {
    width: clamp(15rem, 24vw, 22rem);
    max-width: none;
    align-items: flex-start;
  }
}

.fullscreen-stack-cards__video {
  aspect-ratio: 7 / 9;
}

:deep(.fullscreen-stack-cards__image-cycle .image-cycle-collection__list) {
  border-radius: 1rem;
}

:deep(.fullscreen-stack-cards__image-cycle .image-cycle-collection__before) {
  border-radius: 1rem;
}
</style>
