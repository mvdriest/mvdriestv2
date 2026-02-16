<script lang="ts" setup>
type LinkType = {
  to: string;
  text: string;
};

const mobileMenuOpen = ref(false)

const links: LinkType[] = [
  {
    to: '/over-mij',
    text: 'Over mij'
  },
  {
    to: '/portfolio',
    text: 'Portfolio'
  }
]
</script>

<template>
  <div
    class="w-full top-0 bg-[#2C2E34]"
  >
    <LayoutTheContainer>
      <nav class="relative flex items-center justify-between py-4 z-20">
        <div class="relative flex items-center gap-4">
          <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
          </span>
          <p class="text-white font-medium -mt-1">
            Beschikbaar
          </p>
        </div>
        <div class="flex gap-3 text-white font-medium">
          <p>NL</p>
          <p>EN</p>
        </div>
      </nav>
    </LayoutTheContainer>
  </div>
  <div>
    <header class="bg-dark-600">
      <LayoutTheContainer>
        <nav class="flex items-center justify-between py-8 border-b-[1px] border-white" aria-label="Global">
          <div class="flex flex-1">
            <div class="hidden lg:flex lg:gap-x-12">
              <a v-for="item in links" :key="item.text" :href="item.to" class="text-base font-medium leading-6 text-white">{{ item.text }}</a>
            </div>
            <div class="flex lg:hidden">
              <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white" @click="mobileMenuOpen = true">
                <span class="sr-only">Open main menu</span>
                <Icon name="heroicons:bars-3" class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <a href="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <nuxt-img
              src="/images/other/mvdriest.svg"
              alt="logo"
              class="w-20"
            />
          </a>
          <div class="flex flex-1 justify-end">
            <HomeTheButton class="!py-4 !px-10 rounded-lg font-medium" to="/contact">
              Contact
            </HomeTheButton>
          </div>
        </nav>
      </LayoutTheContainer>
      <HeadlessDialog class="lg:hidden" :open="mobileMenuOpen" @close="mobileMenuOpen = false">
        <div class="fixed inset-0 z-10" />
        <HeadlessDialogPanel class="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6">
          <div class="flex items-center justify-between">
            <div class="flex flex-1">
              <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                <span class="sr-only">Close menu</span>
                <Icon name="heroicons:x-mark" class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
            </a>
            <div class="flex flex-1 justify-end">
              <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
            </div>
          </div>
          <div class="mt-6 space-y-2">
            <a v-for="item in links" :key="item.text" :href="item.to" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{ item.text }}</a>
          </div>
        </HeadlessDialogPanel>
      </HeadlessDialog>
    </header>
  </div>
</template>
