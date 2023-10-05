<script lang="ts" setup>
const skills = [
  "Webdesign",
  "Branding",
  "Video Editing",
  "Webdevelopment",
  "Design",
];
</script>

<template>
  <div class="page overflow-x-hidden">
    <TheHeader />
    <ProjectSlider />
    <LayoutTheContainer>
      <div class="infosection">
        <h1 class="text-4xl md:text-[40px]">
          Ik ben er om uw bedrijf op de juiste plek te plaatsen in de
          <span>digitale wereld</span> en op een professionele manier. Een goede
          huisstijl is essentieel om de juiste uitstraling te geven.
        </h1>
        <div><nuxt-img src="/images/other/MacBookPro.jpg" alt="Macbook" /></div>
      </div>
    </LayoutTheContainer>
    <div class="textslider">
      <div v-for="wrapper in 2" :key="wrapper" class="textwrapper">
        <template v-for="(skill, index) in skills" :key="index">
          <p>{{ skill }}</p>
          <nuxt-img
            class="mx-8 -mt-1"
            src="/images/other/star.svg"
            alt="Star"
          />
        </template>
      </div>
      <div v-for="wrapper in 2" :key="wrapper" class="textwrapper">
        <template v-for="(skill, index) in skills" :key="index">
          <p>{{ skill }}</p>
          <nuxt-img
            class="mx-8 -mt-1"
            src="/images/other/star.svg"
            alt="Star"
          />
        </template>
      </div>
    </div>
    <HomeSectionsServicesSection class="py-[150px]" />
    <div class="pb-[100px]">
      <LayoutTheContainer>
        <div
          class="mb-[35px] gap-[20px] flex flex-col justify-between items-start md:flex-row md:items-center"
        >
          <div>
            <p class="text-[#F5FF00] mb-[20px]">Projecten</p>
            <h1 class="text-white text-[40px] font-semibold">
              Deze bedrijven gingen u voor
            </h1>
          </div>
          <HomeTheButton class="btn" to="/portfolio">
            Alle projecten
          </HomeTheButton>
        </div>
      </LayoutTheContainer>
      <ProjectGrid :limit="2" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  background-color: #111216;
}

.infosection {
  padding: 150px 0px;
  display: grid;
  gap: 100px;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  div {
    position: relative;
    img {
      object-fit: cover;
      width: 100%;
      max-width: 600px;
    }
  }
  h1 {
    max-width: 650px;
    color: #fff;
    font-weight: 600;
    line-height: 62px;
    span {
      color: #f5ff00;
    }
  }
}
@media only screen and (max-width: 1400px) {
  .infosection {
    gap: 50px;
  }
}
@media only screen and (max-width: 1100px) {
  .infosection {
    flex-direction: column;
    grid-template-columns: 1fr;
    div {
      img {
        max-width: 100%;
      }
    }
  }
}
.dot {
  width: 10px;
  height: 10px;
  margin-right: 25px;
  margin-left: 25px;
  border-radius: 20px;
  background-color: #000;
}
.textslider {
  background-color: #f5ff00;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 30px;
  flex-wrap: nowrap;
  transform: rotate(-3deg);
  .textwrapper {
    display: flex;
    animation: 40s slide linear infinite;
    align-items: center;
    flex: 0 0 auto;
    p {
      direction: ltr;
      font-family: Sora, sans-serif;
      font-size: 40px;
      font-weight: 700;
      text-transform: uppercase;
      white-space: normal;
    }
  }
}
@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
