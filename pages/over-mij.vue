<script setup lang="ts">
const socials = [
  {
    imageUrl:
      "https://a.storyblok.com/f/184315/x/a18966d378/behance-logo-black.svg",
    name: "Behance",
    link: "",
  },
  {
    imageUrl:
      "https://a.storyblok.com/f/184315/x/05f5a8d960/linkedin-black.svg",
    name: "Linkedin",
    link: "",
  },
  {
    imageUrl:
      "https://a.storyblok.com/f/184315/x/9ef610a519/instagram1-black.svg",
    name: "Instagram",
    link: "",
  },
];
</script>

<template>
  <div class="bg-dark-600">
    <div
      class="bg-[url('~/assets/image/logo-background.svg')] bg-right bg-contain bg-no-repeat bg-scroll"
    >
      <LayoutTheContainer>
        <div class="flex items-center justify-start">
          <div class="header mt-[190px] mb-[100px]">
            <h1
              class="text-white text-4xl leading-snug md:text-6xl font-semibold md:max-w-2xl mb-8 md:leading-tight"
            >
              Ik ben er om uw bedrijf op de
              <span class="text-primary-600">juiste plek</span> te plaatsen in
              de digitale wereld
            </h1>
            <p class="text-white md:w-96 leading-7">
              Ik ben een creatief persoon die zich bezig houdt met onder andere
              grafisch ontwerpen.
            </p>
          </div>
        </div>
      </LayoutTheContainer>
    </div>
    <div class="over-mij">
      <div class="relative bg-dark-600">
        <LayoutTheContainer>
          <div
            class="relative w-full h-96 mx-auto bg-[url('https://a.storyblok.com/f/184315/1514x1027/dd3388de7a/flyer-mockup-1.jpg')] bg-center bg-cover z-10"
          />
        </LayoutTheContainer>
        <div
          class="absolute left-0 right-0 top-auto bottom-0 w-full h-1/2 bg-primary-600"
        />
      </div>
      <div class="bg-primary-600 py-28">
        <LayoutTheContainer>
          <div
            class="flex gap-8 flex-col md:flex-row items-start md:justify-between"
          >
            <div>
              <h1
                class="max-w-md my-0 text-[2.5rem] leading-[50px] font-semibold"
              >
                Laat me mijzelf introduceren
              </h1>
              <p class="max-w-xl mt-8 text-dark-700 leading-7 font-normal">
                Hallo! Mijn naam is Martijn van Driest. Ik ben een Grafisch
                Ontwerper uit Nederland. Mijn doel is om bedrijven op de juiste
                plek te plaatsen in de digitale wereld. Dat kan doormiddel van
                een website of een volledige huisstijl. Ik kan een bedrijf
                professionaliseren en er een nieuwe frisse wind in brengen.
              </p>
            </div>
            <!-- <div class="flex items-center md:flex-col md:items-end gap-5">
              <a v-for="(social, index) in socials" :key="index" :href="social.link"><nuxt-img
                :src="social.imageUrl"
                :alt="social.name"
                class="md:w-auto md:scale-[1.2] hover:scale-[1.5] transition-all"
              /></a>
            </div> -->
            <SocialsList color="black" direction="column" />
          </div>
        </LayoutTheContainer>
      </div>
      <HomeSectionsServicesSection class="pt-[150px]" />
      <HomeSectionsContactSection />
    </div>
  </div>
</template>
