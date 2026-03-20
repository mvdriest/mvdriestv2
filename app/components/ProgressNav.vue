<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import Lenis from 'lenis'

let cleanupScrollTriggers: (() => void) | null = null
let anchorCleanup: (() => void) | null = null

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

  // --- Lenis / smooth scroll anchor support ---
  let lenis: any = null
  try {
    // Prefer window.Lenis (CDN) if present, otherwise use the installed package
    const LenisClass = (window as any).Lenis || Lenis
    lenis = new LenisClass({ autoRaf: true })
  } catch (e) {
    lenis = null
  }

  const bound: Array<{ el: HTMLElement; handler: EventListener }> = []

  const root = (document.querySelector('.progress-nav') as HTMLElement) || (document.body as HTMLElement)
  const nodeList = root.querySelectorAll<HTMLElement>('[data-anchor-target],[data-progress-nav-target], a[href^="#"]')
  const elems = Array.from(nodeList)

  for (const el of elems) {
    const handler: EventListener = (ev: Event) => {
      ev.preventDefault()
      const target = el.getAttribute('data-anchor-target') || el.getAttribute('data-progress-nav-target') || (el as HTMLAnchorElement).getAttribute('href') || null
      if (!target) return

      // Check if the anchor exists on the current page
      const anchorExists = document.querySelector(target) !== null

      if (anchorExists) {
        // Anchor exists on current page - scroll to it
        if (lenis && typeof lenis.scrollTo === 'function') {
          try {
            lenis.scrollTo(target, {
              easing: (x: number) => (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2),
              duration: 1.0,
              offset: 0
            })
          } catch (e) {
            const node = document.querySelector(target)
            if (node) (node as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        } else {
          const node = document.querySelector(target)
          if (node) (node as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      } else {
        // Anchor doesn't exist on current page - navigate to home with anchor
        window.location.href = '/' + target
      }
    }

    el.addEventListener('click', handler)
    bound.push({ el, handler })
  }

  anchorCleanup = () => {
    bound.forEach(b => b.el.removeEventListener('click', b.handler))
    if (lenis && typeof lenis.destroy === 'function') try { lenis.destroy() } catch (e) {}
  }

  cleanupScrollTriggers = () => {
    triggers.forEach((t) => t?.kill && t.kill())
  }
})

onBeforeUnmount(() => {
  if (cleanupScrollTriggers) {
    cleanupScrollTriggers()
    cleanupScrollTriggers = null
  }
  if (anchorCleanup) {
    anchorCleanup()
    anchorCleanup = null
  }
})
</script>

<template>
  <nav class="fixed inset-x-0 top-0 z-40 w-full px-3 py-2 md:p-8">
    <LayoutTheContainer>

    <div class="relative flex items-center justify-between gap-2 md:gap-0">
      <a href="#top" class="shrink-0 text-inherit no-underline">
        <nuxt-img
              src="/images/other/mvdriest.svg"
              alt="logo"
              class="w-14 md:w-24"
            />
      </a>

      <div class="fixed inset-x-0 bottom-0 z-40 w-full bg-transparent px-3 py-2 md:relative md:inset-auto md:bottom-auto md:w-auto md:px-0 md:py-0">
        <div class="backdrop-blur-xl backdrop-brightness-50 md:rounded-full rounded-none md:p-2 p-0">
          <div
            data-progress-nav-list
            class="relative flex w-full items-center overflow-x-auto overflow-y-hidden rounded-full md:w-auto md:overflow-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div class="progress-nav__indicator absolute left-[-2.5em] z-20 h-10 w-10 rounded-full bg-white transition-all duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)]" />

            <div data-progress-nav-target="#top" class="absolute right-full z-10 h-10 w-10" />

            <a
              data-anchor-target="#mijnwerk"
              data-progress-nav-target="#mijnwerk"
              href="#mijnwerk"
              class="group relative z-30 flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-full px-2.5 text-white no-underline uppercase font-semibold tracking-[-1px] outline-none focus-visible:ring-2 focus-visible:ring-primary-600/80 focus-visible:ring-offset-4 focus-visible:ring-offset-dark-800 md:px-4 [&.is--active]:text-dark-800"
            >
              <span class="relative flex h-full items-center justify-center whitespace-nowrap text-sm md:text-lg">
                <span class="flex h-full items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-0 group-hover:-translate-y-full rotate-[0.001deg]">
                  <span class="font-family-helvetica font-semibold">Mijn werk</span>
                </span>
                <span class="absolute top-full flex h-full items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-0 group-hover:-translate-y-full rotate-[0.001deg]">
                  <span class="font-family-helvetica font-semibold">Mijn werk</span>
                </span>
              </span>
          </a>

            <a
              data-progress-nav-target="#concept"
              href="#concept"
              class="group relative z-30 flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-full px-2.5 text-white no-underline uppercase font-semibold tracking-[-1px] outline-none focus-visible:ring-2 focus-visible:ring-primary-600/80 focus-visible:ring-offset-4 focus-visible:ring-offset-dark-800 md:px-4 [&.is--active]:text-dark-800"
            >
              <span class="relative flex h-full items-center justify-center whitespace-nowrap text-sm md:text-lg">
                <span class="flex h-full items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-0 group-hover:-translate-y-full rotate-[0.001deg]">
                  <span class="font-family-helvetica font-semibold">Over mij</span>
                </span>
                <span class="absolute top-full flex h-full items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-0 group-hover:-translate-y-full rotate-[0.001deg]">
                  <span class="font-family-helvetica font-semibold">Over mij</span>
                </span>
              </span>
          </a>

            <a
              data-progress-nav-target="#service"
              href="#service"
              class="group relative z-30 flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-full px-2.5 text-white no-underline uppercase font-semibold tracking-[-1px] outline-none focus-visible:ring-2 focus-visible:ring-primary-600/80 focus-visible:ring-offset-4 focus-visible:ring-offset-dark-800 md:px-4 [&.is--active]:text-dark-800"
            >
              <span class="relative flex h-full items-center justify-center whitespace-nowrap text-sm md:text-lg">
                <span class="flex h-full items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-0 group-hover:-translate-y-full rotate-[0.001deg]">
                  <span class="font-family-helvetica font-semibold">Services</span>
                </span>
                <span class="absolute top-full flex h-full items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-0 group-hover:-translate-y-full rotate-[0.001deg]">
                  <span class="font-family-helvetica font-semibold">Services</span>
                </span>
              </span>
          </a>

            <div data-progress-nav-target="#bottom" class="absolute left-full z-10 h-10 w-10" />
        </div>
      </div>
      </div>

      <NuxtLink
        to="/contact"
        class="group relative z-50 inline-flex h-10 items-center justify-center overflow-hidden rounded-full bg-white px-4 text-dark-800 no-underline uppercase font-semibold tracking-[-1px] outline-none focus-visible:ring-2 focus-visible:ring-primary-600/80 focus-visible:ring-offset-4 focus-visible:ring-offset-dark-800 md:h-14 md:px-6"
      >
        <span class="relative flex h-full items-center justify-center whitespace-nowrap text-sm md:text-lg">
          <span class="flex h-full items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-0 group-hover:-translate-y-full rotate-[0.001deg]">
            Contact
          </span>
          <span class="absolute top-full flex h-full items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-0 group-hover:-translate-y-full rotate-[0.001deg]">
            Contact
          </span>
        </span>
      </NuxtLink>
    </div>
  </LayoutTheContainer>
  </nav>
</template>
