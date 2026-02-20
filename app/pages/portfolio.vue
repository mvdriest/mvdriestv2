<template>
  <section class="bg-[#111216]">
    <div class="bg-right bg-contain bg-no-repeat bg-scroll bg-[url('~/assets/image/logo-background.svg')]">
      <LayoutTheContainer>
        <div class="flex items-center justify-start">
          <div class="header mt-[190px] mb-[100px]">
            <h1 class="text-white text-6xl font-semibold max-w-2xl mb-8 leading-tight">
              Projecten
            </h1>
            <p class="text-white md:w-96 leading-7">
              Vindt hier de projecten waar ik trots op ben!
            </p>
          </div>
        </div>
      </LayoutTheContainer>
    </div>
    <ProjectGrid :limit="99" class="pb-[150px]" />
  </section>
</template>
