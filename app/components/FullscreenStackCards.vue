<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type StackCard = {
  title: string
  description: string
  image: string
  alt: string
  backgroundColor: string
  chips: [string, string, string, string]
}

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
    image: '/images/projecten/autoatlas/gallery1/img2.jpeg',
    alt: 'Video productie',
    backgroundColor: '#111216',
    chips: ['Concepting', 'Regie', 'Opname', 'Montage']
  },
  {
    title: 'FOTOGRAFIE',
    description: 'Sterke beelden met karakter, licht en compositie die je verhaal dragen.',
    image: '/images/projecten/liveshot/header.jpg',
    alt: 'Fotografie',
    backgroundColor: '#FA7A2B',
    chips: ['Portret', 'Product', 'Event', 'Nabewerking']
  },
  {
    title: 'BRANDING',
    description: 'Een herkenbare visuele identiteit die overal klopt en vertrouwen opbouwt.',
    image: '/images/projecten/branding-giftcard/header.jpg',
    alt: 'Branding',
    backgroundColor: '#ffffff',
    chips: ['Logo design', 'Kleurenpalet', 'Typografie', 'Brand assets']
  },
  {
    title: 'WEBDESIGN & DEVELOPMENT',
    description: 'Snelle, sterke websites die goed voelen en gericht zijn op resultaat.',
    image: '/images/projecten/atlaspowerandgas/header.jpg',
    alt: 'Webdesign en development',
    backgroundColor: '#f5ff00',
    chips: ['UX/UI design', 'Nuxt', 'CMS integratie', 'Performance']
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
          <LayoutTheContainer> 

            <div class="flex gap-5 justify-between z-2 md:py-24 h-full" :style="{ color: getReadableTextColor(card.backgroundColor) }">
              <div class="flex flex-col items-stretch justify-between max-w-96 md:max-w-lg lg:max-w-xl h-full">
                <h2 class="z-50 text-4xl md:text-7xl uppercase font-bold max-w-200 leading-tight md:leading-18 text-left">{{ card.title }}</h2>
                <div>
                  <p class="z-50 text-base md:text-2xl font-semibold text-left max-w-88 md:max-w-96 pt-4 font-family-helvetica -tracking-[1px] max-[640px]:max-w-[95%]" :style="{ color: getDescriptionColor(card.backgroundColor) }">{{ card.description }}</p>
                  <ul class="mt-5 flex flex-wrap gap-2.5 max-w-96 md:max-w-md">
                    <li
                      v-for="chip in card.chips"
                      :key="`${card.title}-${chip}`"
                      class="rounded-full border px-3 py-1 text-xs md:text-sm font-semibold uppercase tracking-wide"
                      :style="getChipStyle(card.backgroundColor)"
                    >
                      {{ chip }}
                    </li>
                  </ul>
                </div>
              </div>
                <nuxt-img
                class="h-72 w-56 object-cover rounded-md"
                :src="card.image"
                :alt="card.alt"
              />
            </div>
          </LayoutTheContainer>
        </article>
      </div>
    </div>
  </section>
</template>
