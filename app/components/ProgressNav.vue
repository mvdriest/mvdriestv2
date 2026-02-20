<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

let cleanupScrollTriggers: (() => void) | null = null

onMounted(async () => {
  if (!process.client) { return }

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')

  gsap.registerPlugin(ScrollTrigger)

  const navProgress = document.querySelector<HTMLElement>('[data-progress-nav-list]')
  if (!navProgress) { return }

  let indicator = navProgress.querySelector<HTMLElement>('.progress-nav__indicator')
  if (!indicator) {
    indicator = document.createElement('div')
    indicator.className = 'progress-nav__indicator'
    navProgress.appendChild(indicator)
  }

  const updateIndicator = (activeLink: HTMLElement) => {
    const parentWidth = navProgress.offsetWidth
    const parentHeight = navProgress.offsetHeight

    const parentRect = navProgress.getBoundingClientRect()
    const linkRect = activeLink.getBoundingClientRect()
    const linkPos = {
      left: linkRect.left - parentRect.left,
      top: linkRect.top - parentRect.top
    }

    const linkWidth = activeLink.offsetWidth
    const linkHeight = activeLink.offsetHeight

    const leftPercent = (linkPos.left / parentWidth) * 100
    const topPercent = (linkPos.top / parentHeight) * 100
    const widthPercent = (linkWidth / parentWidth) * 100
    const heightPercent = (linkHeight / parentHeight) * 100

    indicator.style.left = `${leftPercent}%`
    indicator.style.top = `${topPercent}%`
    indicator.style.width = `${widthPercent}%`
    indicator.style.height = `${heightPercent}%`
  }

  const progressAnchors = gsap.utils.toArray<HTMLElement>('[data-progress-nav-anchor]')
  const triggers: any[] = []

  progressAnchors.forEach((progressAnchor) => {
    const anchorID = progressAnchor.getAttribute('id')
    if (!anchorID) { return }

    const trigger = ScrollTrigger.create({
      trigger: progressAnchor,
      start: '0% 50%',
      end: '100% 50%',
      onEnter: () => {
        const activeLink = navProgress.querySelector<HTMLElement>('[data-progress-nav-target="#' + anchorID + '"]')
        if (!activeLink) { return }

        activeLink.classList.add('is--active')
        const siblings = navProgress.querySelectorAll<HTMLElement>('[data-progress-nav-target]')
        siblings.forEach((sib) => {
          if (sib !== activeLink) {
            sib.classList.remove('is--active')
          }
        })
        updateIndicator(activeLink)
      },
      onEnterBack: () => {
        const activeLink = navProgress.querySelector<HTMLElement>('[data-progress-nav-target="#' + anchorID + '"]')
        if (!activeLink) { return }

        activeLink.classList.add('is--active')
        const siblings = navProgress.querySelectorAll<HTMLElement>('[data-progress-nav-target]')
        siblings.forEach((sib) => {
          if (sib !== activeLink) {
            sib.classList.remove('is--active')
          }
        })
        updateIndicator(activeLink)
      }
    })

    triggers.push(trigger)
  })

  cleanupScrollTriggers = () => {
    triggers.forEach((t) => t?.kill && t.kill())
  }
})

onBeforeUnmount(() => {
  if (cleanupScrollTriggers) {
    cleanupScrollTriggers()
    cleanupScrollTriggers = null
  }
})
</script>

<template>
  <nav class="progress-nav">
    <LayoutTheContainer>

    <div class="progress-nav__inner">
      <a href="#top" class="progress-nav__logo">
        <nuxt-img
              src="/images/other/mvdriest.svg"
              alt="logo"
              class="progress-nav__logo-svg"
            />
      </a>

      <div class="progress-nav__wrapper">
        <div data-progress-nav-list class="progress-nav__list">
          <div class="progress-nav__indicator" />
          <div data-progress-nav-target="#top" class="progress-nav__btn is--before" />
          <a data-progress-nav-target="#introduction" href="#introduction" class="progress-nav__btn">
            <span class="progress-nav__btn-text font-family-helvetica font-semibold ">Over mij</span>
            <span class="progress-nav__btn-text is--duplicate font-family-helvetica font-semibold ">Over mij</span>
          </a>
          <a data-progress-nav-target="#concept" href="#concept" class="progress-nav__btn">
            <span class="progress-nav__btn-text font-family-helvetica font-semibold ">Mijn werk</span>
            <span class="progress-nav__btn-text is--duplicate font-family-helvetica font-semibold ">Mijn werk</span>
          </a>
          <a data-progress-nav-target="#product" href="#product" class="progress-nav__btn">
            <span class="progress-nav__btn-text font-family-helvetica font-semibold">Services</span>
            <span class="progress-nav__btn-text is--duplicate font-family-helvetica font-semibold">Services</span>
          </a>
          <a data-progress-nav-target="#result" href="#result" class="progress-nav__btn">
            <span class="progress-nav__btn-text font-family-helvetica font-semibold">Frequentie</span>
            <span class="progress-nav__btn-text is--duplicate font-family-helvetica font-semibold">Frequentie</span>
          </a>
          <div data-progress-nav-target="#bottom" class="progress-nav__btn is--after" />
        </div>
      </div>

      <a href="#bottom" class="progress-nav__contact-btn">
        <span class="progress-nav__btn-text">Get in touch</span>
        <span class="progress-nav__btn-text is--duplicate">Get in touch</span>
      </a>
    </div>
  </LayoutTheContainer>
  </nav>
</template>

<style lang="scss" scoped>
.progress-nav {
  width: 100%;
  padding: 2em;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
}

.progress-nav__inner {
  justify-content: space-between;
  align-items: center;
  display: flex;
  position: relative;
}

.progress-nav__logo {
  color: inherit;
  text-decoration: none;
}

.progress-nav__logo-svg {
  width: 6em;
}

.progress-nav__wrapper {
  background-color: #c9cce0;
  border-radius: 50em;
  padding: .5em;
}

.progress-nav__list {
  border-radius: 50em;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  position: relative;
  overflow: hidden;
}

.progress-nav__indicator {
  z-index: 2;
  background-color: #fff;
  border-radius: 50em;
  width: 2.5em;
  height: 2.5em;
  position: absolute;
  left: -2.5em;
  transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.progress-nav__btn {
  z-index: 3;
  cursor: pointer;
  color: inherit;
  justify-content: center;
  align-items: center;
  height: 2.5em;
  padding-left: 1em;
  padding-right: 1em;
  text-decoration: none;
  display: flex;
  position: relative;
  overflow: hidden;
}

.progress-nav__btn.is--before {
  z-index: 1;
  width: 2.5em;
  height: 2.5em;
  padding-left: 0;
  padding-right: 0;
  position: absolute;
  right: 100%;
}

.progress-nav__btn.is--after {
  z-index: 1;
  width: 2.5em;
  height: 2.5em;
  padding-left: 0;
  padding-right: 0;
  position: absolute;
  left: 100%;
}

.progress-nav__btn-text {
  white-space: nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.125em;
  font-weight: 500;
  display: flex;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateY(0%) rotate(0.001deg);
}

.progress-nav__btn-text.is--duplicate {
  position: absolute;
  top: 100%;
}

.progress-nav__btn.is--active {
  color: #2d336b;
}

.progress-nav__btn.is--active .progress-nav__btn-text {
  font-weight: 600;
}

.progress-nav__btn:hover .progress-nav__btn-text,
.progress-nav__contact-btn:hover .progress-nav__btn-text{
  transform: translateY(-100%) rotate(0.001deg);
}

.progress-nav__contact-btn {
  color: #fff;
  background-color: #2d336b;
  border-radius: 50em;
  height: 3.5em;
  padding-left: 1.5em;
  padding-right: 1.5em;
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.section-resource {
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  display: flex;
}

.section-resource.is--flipped {
  color: #fff;
  background-color: #7886c7;
}

.section-resource__h2 {
  font-size: 5em;
  font-weight: 500;
  line-height: 1;
}

@media (max-width: 767px) {
  .progress-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0.5rem 0.75rem;
    z-index: 40;
  }

  .progress-nav__inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .progress-nav__logo-svg {
    width: 3.5rem;
  }

  .progress-nav__wrapper {
    position: fixed;             /* menu-balk onderaan het scherm */
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    padding: 0.4rem 0.75rem;
    border-radius: 0;            /* optioneel: full-width bar onderaan */
    z-index: 40;
  }

  .progress-nav__list {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
  }

  .progress-nav__list::-webkit-scrollbar {
    display: none;
  }

  .progress-nav__btn {
    padding-left: 0.6rem;
    padding-right: 0.6rem;
  }

  .progress-nav__btn-text {
    font-size: 0.85rem;
  }

  .progress-nav__contact-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2.5em;
    padding-left: 0.9em;
    padding-right: 0.9em;
    font-size: 0.85rem;
  }
}
</style>
