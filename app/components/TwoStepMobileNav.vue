<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

type NavStatus = 'active' | 'not-active'

const route = useRoute()

const navStatus = ref<NavStatus>('not-active')
const isActive = computed(() => navStatus.value === 'active')

const setNavStatus = (status: NavStatus) => {
  navStatus.value = status
}

const openNav = () => setNavStatus('active')
const closeNav = () => setNavStatus('not-active')
const toggleNav = () => (isActive.value ? closeNav() : openNav())

const primaryLinks = [
  { to: '/#top', text: 'Home' },
  { to: '/#mijnwerk', text: 'Mijnwerk' },
  { to: '/#overmij', text: 'Over mij' },
  { to: '/#services', text: 'Services' },
  { to: '/contact', text: 'Contact' }
]

const secondaryLinks = [
  { href: 'https://www.instagram.com/', text: 'Instagram' },
  { href: 'https://www.linkedin.com/', text: 'LinkedIn' },
  { href: 'https://www.behance.net/', text: 'Behance' }
]

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isActive.value) closeNav()
}

onMounted(() => {
  document.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeyDown)
})

watch(
  () => route.fullPath,
  () => {
    // Close the menu when navigating
    closeNav()
  }
)
</script>

<template>
  <nav
    data-twostep-nav
    class="fixed inset-0 z-100 pointer-events-none"
    :data-nav-status="navStatus"
    aria-label="Mobile"
  >
    <div
      data-nav-toggle="close"
      class="absolute inset-0 pointer-events-auto transition-[opacity,visibility] duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] bg-dark-800/45"
      :class="isActive ? 'opacity-100 visible' : 'opacity-0 invisible'"
      @click="closeNav"
    />

    <div class="absolute left-0 top-0 flex w-full justify-center items-stretch">
      <div class="flex w-full max-w-[48em] flex-col items-center px-5 pt-5">
        <div
          class="relative w-full max-w-[25em] pointer-events-auto text-white transition-[max-width] ease-[cubic-bezier(0.625,0.05,0,1)]"
          :class="isActive ? 'max-w-full duration-500 delay-0' : 'duration-750 delay-200'"
        >
          <div
            class="absolute z-0 transition-[inset] duration-500 ease-[cubic-bezier(0.625,0.05,0,1)]"
            :class="isActive ? 'inset-[-1.25em] md:inset-[-0.25em]' : 'inset-0'"
          >
            <div
              class="absolute inset-0 rounded-xl backdrop-blur-xl backdrop-brightness-50 transition-colors duration-200"
            />
          </div>

          <div class="relative z-1 flex h-16 w-full items-center justify-between px-5 py-5">
            <NuxtLink
              to="/"
              class="flex h-full w-24 items-center justify-start"
              aria-label="Home"
              @click="closeNav"
            >
              <nuxt-img
                src="/images/other/mvdriest.svg"
                alt="mvdriest"
                class="h-full"
              />
            </NuxtLink>

            <button
              data-nav-toggle="toggle"
              type="button"
              class="group relative flex h-10 w-10 items-center justify-center bg-transparent p-0 pointer-events-auto"
              :aria-expanded="isActive"
              aria-controls="twostep-nav-bottom"
              @click="toggleNav"
            >
              <span class="sr-only">Toggle menu</span>
              <div
                class="absolute h-0.5 w-[1.875em] bg-white transition-transform duration-500 ease-[cubic-bezier(0.625,0.05,0,1)]"
                :class="
                  isActive
                    ? 'translate-y-0 rotate-45'
                    : '-translate-y-1 rotate-[0.001deg] group-hover:translate-y-1'
                "
              />
              <div
                class="absolute h-0.5 w-[1.875em] bg-white transition-transform duration-500 ease-[cubic-bezier(0.625,0.05,0,1)]"
                :class="
                  isActive
                    ? 'translate-y-0 -rotate-45'
                    : 'translate-y-[0.15em] rotate-[0.001deg] group-hover:translate-y-[-0.15em]'
                "
              />
            </button>

            <div
              class="absolute -bottom-2 left-4 right-4 md:bottom-0 md:left-3 md:right-3 z-2 h-px bg-white/15 transition-all duration-500 ease-[cubic-bezier(0.625,0.05,0,1)]"
              :class="isActive ? 'opacity-100 delay-100' : 'opacity-0 delay-0'"
            />
          </div>

          <div
            id="twostep-nav-bottom"
            class="relative grid w-full overflow-hidden transition-[grid-template-rows,transform] duration-500 ease-[cubic-bezier(0.625,0.05,0,1)]"
            :class="
              isActive
                ? 'grid-rows-[1fr] translate-y-0 delay-250 duration-750'
                : 'grid-rows-[0fr] -translate-y-[0.625em] delay-0'
            "
          >
            <div class="relative flex h-full flex-col items-center overflow-hidden">
              <div class="relative flex w-full flex-col items-center p-6">
                <div class="flex w-full items-start justify-start">
                  <div
                    class="flex flex-1 min-h-full"
                    :class="
                      isActive
                        ? 'translate-y-0 opacity-100 duration-750 delay-500'
                        : 'translate-y-8 opacity-0 duration-500 delay-0'
                    "
                    style="transition-property: transform, opacity"
                  >
                    <div class="flex w-full flex-col items-start justify-between gap-8">
                      <ul class="flex w-full flex-col items-stretch list-none p-0 m-0">
                        <li v-for="item in primaryLinks" :key="item.text">
                          <NuxtLink
                            :to="item.to"
                            class="relative block w-full py-1.5 no-underline rounded-md outline-none focus-visible:ring-2 focus-visible:ring-primary-600/80 focus-visible:ring-offset-4 focus-visible:ring-offset-dark-700"
                            @click="closeNav"
                          >
                            <span
                              class="font-family-helvetica text-[2.125em] leading-none font-semibold uppercase tracking-[-0.04em] transition-colors hover:text-primary-600"
                              :class="isActive ? '' : ''"
                            >
                              {{ item.text }}
                            </span>
                          </NuxtLink>
                        </li>
                      </ul>

                      <ul class="flex w-full flex-wrap items-start justify-start gap-x-4 gap-y-1 list-none p-0 m-0">
                        <li v-for="item in secondaryLinks" :key="item.text">
                          <a
                            :href="item.href"
                            target="_blank"
                            rel="noreferrer"
                            class="relative block w-full py-1.5 no-underline rounded-md outline-none focus-visible:ring-2 focus-visible:ring-primary-600/80 focus-visible:ring-offset-4 focus-visible:ring-offset-dark-700"
                            @click="closeNav"
                          >
                            <span
                              class="font-family-helvetica text-base leading-none font-medium tracking-[-0.02em] opacity-75 transition-colors hover:text-primary-600"
                            >
                              {{ item.text }}
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div
                    class="hidden md:flex flex-1 min-h-full"
                    :class="
                      isActive
                        ? 'translate-y-0 opacity-100 duration-750 delay-575'
                        : 'translate-y-8 opacity-0 duration-500 delay-0'
                    "
                    style="transition-property: transform, opacity"
                  >
                    <div class="aspect-square w-full overflow-hidden rounded-lg border border-white/10">
                      <nuxt-img
                        src="/images/other/camerafotoik.jpg"
                        alt=""
                        class="h-full w-full object-cover"
                        format="webp"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
