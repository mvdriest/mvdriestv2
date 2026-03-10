<template>
  <div class="stacking-cards__collection">
    <div class="stacking-cards__list">
      <div
        v-for="(card, index) in cards"
        :key="index"
        data-stacking-cards-item
        :class="['stacking-cards__item', `is--${card.theme}`]"
      >
        <div class="stacking-cards__visuals" aria-hidden="true">
          <img
            :src="card.images.main.src"
            :alt="card.images.main.alt"
            class="stacking-cards__image is--main"
            data-stacking-cards-img
          >
          <div class="stacking-cards__image-overlay" />
        </div>

        <div class="stacking-cards__center-content">
          <div class="stacking-cards__top-row">
            <span class="stacking-cards__label">{{ card.label }}</span>
            <span class="stacking-cards__metric">{{ card.metric }}</span>
          </div>

          <div class="stacking-cards__content-block">
            <h1 class="stacking-cards__item-h">
              <template v-for="(line, lineIndex) in card.titleLines" :key="lineIndex">
                {{ line }}
                <br v-if="lineIndex < card.titleLines.length - 1">
              </template>
            </h1>

            <p class="stacking-cards__description font-family-helvetica">
              {{ card.description }}
            </p>

            <NuxtLink :to="card.link" class="stacking-cards__cta font-family-helvetica">
              Bekijk {{ card.label.toLowerCase() }}
            </NuxtLink>
          </div>

          <img
            :src="card.images.accent.src"
            :alt="card.images.accent.alt"
            class="stacking-cards__image is--accent"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Card {
  theme: 'video' | 'foto' | 'branding' | 'web'
  label: string
  metric: string
  titleLines: string[]
  description: string
  link: string
  images: {
    main: {
      src: string
      alt: string
    }
    accent: {
      src: string
      alt: string
    }
  }
}

interface Props {
  cards?: Card[]
  parallaxIntensity?: number
}

const props = withDefaults(defineProps<Props>(), {
  cards: () => [
    {
      theme: 'video',
      label: 'VIDEO',
      metric: '14K+ weergaven',
      titleLines: ['IK MAAK', 'BEWEGEND 📹 BEELD', 'DAT RAAKT'],
      description: 'Van korte, scherpe social clips tot films die een merk echt laten leven. Ik hou van ritme, emotie en elk frame dat telt.',
      link: '/portfolio',
      images: {
        main: {
          src: '/images/projecten/autoatlas/gallery1/img2.jpeg',
          alt: 'Video hoofdbeeld'
        },
        accent: {
          src: '/images/projecten/autoatlas/gallery1/img3.jpeg',
          alt: 'Video accentbeeld'
        }
      }
    },
    {
      theme: 'foto',
      label: 'FOTO',
      metric: '120+ shoots',
      titleLines: ['FOTO\u00adGRAFIE', 'MET KARAKTER', 'EN SFEER'],
      description: 'Van portret tot campagnebeeld: ik zoek het juiste licht, sterke compositie en details die je verhaal visueel dragen.',
      link: '/portfolio',
      images: {
        main: {
          src: '/images/projecten/liveshot/header.jpg',
          alt: 'Foto hoofdbeeld'
        },
        accent: {
          src: '/images/projecten/fcuheadlines/header.jpg',
          alt: 'Foto accentbeeld'
        }
      }
    },
    {
      theme: 'branding',
      label: 'BRANDING',
      metric: '35+ merken',
      titleLines: ['JOUW MERK', 'IN EEN', 'HERKENBARE STIJL'],
      description: 'Ik help je merk visueel consistent neerzetten, zodat elk beeld en elke uiting meteen als jouw merk voelt.',
      link: '/portfolio',
      images: {
        main: {
          src: '/images/projecten/branding-giftcard/header.jpg',
          alt: 'Branding hoofdbeeld'
        },
        accent: {
          src: '/images/projecten/atlaspowerandgas/header.jpg',
          alt: 'Branding accentbeeld'
        }
      }
    },
    {
      theme: 'web',
      label: 'WEB',
      metric: '50+ websites',
      titleLines: ['WEBSITES', 'DIE SNEL', 'EN STERK VOELEN'],
      description: 'Van structuur tot interactie: ik maak webervaringen die duidelijk zijn, vertrouwen wekken en converteren.',
      link: '/portfolio',
      images: {
        main: {
          src: '/images/projecten/atlaspowerandgas/header.jpg',
          alt: 'Web hoofdbeeld'
        },
        accent: {
          src: '/images/projecten/agua/header.jpg',
          alt: 'Web accentbeeld'
        }
      }
    }
  ],
  parallaxIntensity: 50
})

const initStackingCardsParallax = () => {
  const cards = document.querySelectorAll('[data-stacking-cards-item]')

  if (cards.length < 2) return

  cards.forEach((card, i) => {
    // Skip over the first section
    if (i === 0) return

    // When current section is in view, target the PREVIOUS one
    const previousCard = cards[i - 1]
    if (!previousCard) return

    // Find any element inside the previous card
    const previousCardImage = previousCard.querySelector('[data-stacking-cards-img]') || previousCard

    const tl = gsap.timeline({
      defaults: {
        ease: 'none',
        duration: 1
      },
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        invalidateOnRefresh: true
      }
    })

    tl.fromTo(previousCard, { yPercent: 0 }, { yPercent: props.parallaxIntensity })
      .fromTo(previousCardImage, { yPercent: 0, scale: 1 }, { yPercent: -10, scale: 0.98 }, '<')
  })
}

onMounted(() => {
  // Give the DOM time to render
  setTimeout(() => {
    initStackingCardsParallax()
  }, 100)
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<style scoped>
.stacking-cards__collection {
  width: 100%;
  padding: 0.5rem;
}

.stacking-cards__list {
  flex-flow: column;
  display: flex;
  gap: 0.25rem;
}

.stacking-cards__item {
  color: #fff;
  border-radius: 1.5rem;
  width: 100%;
  min-height: 85vh;
  margin-top: 0;
  background-color: #111216;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.stacking-cards__item.is--video {
  background-color: #121215;
}

.stacking-cards__item.is--foto {
  background-color: #111922;
}

.stacking-cards__item.is--branding {
  background-color: #15121d;
}

.stacking-cards__item.is--web {
  background-color: #121821;
}

.stacking-cards__center-content {
  position: absolute;
  inset: 0;
  z-index: 2;
  min-height: 100%;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  text-align: left;
}

.stacking-cards__content-block {
  margin-top: auto;
  max-width: 44rem;
  padding-right: clamp(0rem, 15vw, 11rem);
  padding-bottom: clamp(4.8rem, 9vw, 7.2rem);
}

.stacking-cards__top-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
}

.stacking-cards__label {
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.68);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.62rem 0.85rem;
}

.stacking-cards__metric {
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.7);
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.03em;
  padding: 0.58rem 0.78rem;
}

.stacking-cards__item-h {
  text-align: left;
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 0.85rem;
  margin-left: 0;
  margin-right: 0;
  font-size: clamp(1.7rem, 5.8vw, 3.2rem);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.03em;
  max-width: 12ch;
  color: #fff;
}

.stacking-cards__description {
  max-width: 33rem;
  margin: 0;
  font-size: clamp(0.95rem, 1.3vw, 1.05rem);
  line-height: 1.45;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.88);
}

.stacking-cards__cta {
  margin-top: 1.1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 700;
  padding: 0.68rem 1rem;
  backdrop-filter: blur(8px);
  transition: opacity 0.2s ease;
}

.stacking-cards__cta:hover {
  opacity: 0.9;
}

.stacking-cards__visuals {
  position: relative;
  inset: auto;
  z-index: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.stacking-cards__image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(11, 11, 14, 0.08) 0%, rgba(11, 11, 14, 0.55) 56%, rgba(10, 10, 12, 0.88) 100%);
}

.stacking-cards__image {
  position: absolute;
  object-fit: cover;
  border-radius: 0;
  box-shadow: none;
}

.stacking-cards__image.is--main {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  transform: none;
}

.stacking-cards__image.is--accent {
  position: absolute;
  width: clamp(6.4rem, 14vw, 10.2rem);
  height: clamp(8.2rem, 16vw, 12.4rem);
  right: 1.25rem;
  bottom: 1.25rem;
  border-radius: 0.9rem;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
}

@media (max-width: 991px) {
  .stacking-cards__item {
    min-height: 78vh;
  }

  .stacking-cards__item-h {
    font-size: clamp(1.55rem, 7vw, 2.4rem);
    max-width: 11ch;
  }
}

@media (max-width: 640px) {
  .stacking-cards__center-content {
    padding: 1rem;
  }

  .stacking-cards__content-block {
    padding-right: 0;
    padding-bottom: 6rem;
  }

  .stacking-cards__item-h {
    margin-bottom: 0.7rem;
    max-width: 10ch;
  }

  .stacking-cards__description {
    max-width: 17rem;
    font-size: 0.88rem;
  }

  .stacking-cards__image.is--accent {
    width: 5.8rem;
    height: 7.4rem;
    right: 1rem;
    bottom: 1rem;
  }

  .stacking-cards__cta {
    margin-top: 0.85rem;
    font-size: 0.82rem;
    padding: 0.58rem 0.88rem;
  }
}
</style>
