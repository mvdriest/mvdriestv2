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
}

const cards: StackCard[] = [
  {
    title: 'VIDEO PRODUCTIE',
    description: 'Van social content tot cinematische merkfilms die blijven hangen.',
    image: '/images/projecten/autoatlas/gallery1/img2.jpeg',
    alt: 'Video productie'
  },
  {
    title: 'FOTOGRAFIE',
    description: 'Sterke beelden met karakter, licht en compositie die je verhaal dragen.',
    image: '/images/projecten/liveshot/header.jpg',
    alt: 'Fotografie'
  },
  {
    title: 'BRANDING',
    description: 'Een herkenbare visuele identiteit die overal klopt en vertrouwen opbouwt.',
    image: '/images/projecten/branding-giftcard/header.jpg',
    alt: 'Branding'
  },
  {
    title: 'WEBDESIGN & DEVELOPMENT',
    description: 'Snelle, sterke websites die goed voelen en gericht zijn op resultaat.',
    image: '/images/projecten/atlaspowerandgas/header.jpg',
    alt: 'Webdesign en development'
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
  <section ref="sectionRef" class="fullscreen-stack" data-progress-nav-anchor>
    <div class="fullscreen-stack__sticky">
      <div ref="cardsRef" class="fullscreen-stack__cards">
        <article
          v-for="(card, index) in cards"
          :key="card.title"
          data-fullscreen-stack-card
          class="fullscreen-stack__card"
        >
          <nuxt-img
            class="fullscreen-stack__image"
            :src="card.image"
            :alt="card.alt"
          />

          <div class="fullscreen-stack__overlay" />

          <div class="fullscreen-stack__content">
            <p class="fullscreen-stack__index">0{{ index + 1 }}</p>
            <h2 class="fullscreen-stack__title">{{ card.title }}</h2>
            <p class="fullscreen-stack__description font-family-helvetica">{{ card.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fullscreen-stack {
  width: 100%;
  min-height: 100vh;
}

.fullscreen-stack__sticky {
  width: 100%;
  height: 100vh;
  padding: 50px;
  position: relative;
}

.fullscreen-stack__cards {
  width: 100%;
  height: 100%;
  position: relative;
}

.fullscreen-stack__card {
  position: absolute;
  inset: 0;
  border-radius: 1.75rem;
  overflow: hidden;
  background-color: #16171c;
  transform-origin: 50% 50%;
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.fullscreen-stack__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fullscreen-stack__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(8, 9, 12, 0.08) 0%, rgba(8, 9, 12, 0.45) 58%, rgba(8, 9, 12, 0.84) 100%);
}

.fullscreen-stack__content {
  position: absolute;
  left: 2rem;
  right: 2rem;
  bottom: 2rem;
  color: #fff;
  z-index: 2;
}

.fullscreen-stack__index {
  display: inline-flex;
  margin: 0 0 0.8rem;
  padding: 0.45rem 0.7rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.55);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.fullscreen-stack__title {
  margin: 0;
  text-transform: uppercase;
  font-size: clamp(1.8rem, 4.7vw, 4rem);
  line-height: 0.95;
  letter-spacing: -0.02em;
}

.fullscreen-stack__description {
  margin: 0.9rem 0 0;
  max-width: 34rem;
  font-size: clamp(0.95rem, 1.2vw, 1.12rem);
  line-height: 1.45;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

@media (max-width: 991px) {
  .fullscreen-stack__sticky {
    padding: 35px;
  }
}

@media (max-width: 640px) {
  .fullscreen-stack__sticky {
    padding: 20px;
  }

  .fullscreen-stack__card {
    border-radius: 1rem;
  }

  .fullscreen-stack__content {
    left: 1.1rem;
    right: 1.1rem;
    bottom: 1.1rem;
  }

  .fullscreen-stack__description {
    max-width: 95%;
  }
}
</style>
