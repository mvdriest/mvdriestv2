<script lang="ts" setup>
type LinkType = {
  to: string;
  text: string;
};
const links: LinkType[] = [
  {
    to: "/over-mij",
    text: "Over mij",
  },
  {
    to: "/portfolio",
    text: "Portfolio",
  },
];
</script>

<template>
  <div
    class="absolute w-full top-0 bg-gradient-to-b from-dark-600/60 to-transparent"
  >
    <LayoutTheContainer>
      <nav class="relative flex items-center justify-between pt-10 z-20">
        <NuxtLink to="/">
          <nuxt-img
            src="/images/other/Logo-mvdriest-geel.png"
            alt="logo"
            class="w-20"
          />
        </NuxtLink>
        <div
          class="absolute inset-0 mx-44 flex justify-center items-center pt-10 z-10"
        >
          <div class="flex gap-5">
            <NuxtLink
              v-for="(link, index) in links"
              :key="index"
              :to="link.to"
              class="opacity-100 text-white no-underline hover:underline"
            >
              {{ link.text }}
            </NuxtLink>
          </div>
        </div>
        <HomeTheButton class="!py-4 !px-10 rounded-lg" to="/contact">
          Contact
        </HomeTheButton>
      </nav>
    </LayoutTheContainer>
  </div>
</template>
