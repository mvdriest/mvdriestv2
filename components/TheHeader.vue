<template>
  <section class=" flex items-center">
    <LayoutTheContainer>
      <div class=" mt-[50px] mb-[150px] flex items-center justify-center pt-5 relative">
        <div>
          <!-- <p class="text-primary-600 text-center">
            Welkom
          </p> -->
          <h1 class="text-4xl leading-snug md:text-9xl font-bold text-center uppercase text-white my-8 md:leading-[9rem]">
            Wij maken jouw bedrijf Herkenbaar
            <div class="relative h-[49.500px] md:h-[75px]">
              <div class="absolute h-[49.500px] md:h-[75px] overflow-hidden w-full">
                <!-- <div class="flex flex-col animb md:ani">
                  <span class="text-primary-600">Proffesioneler</span>
                  <span class="text-primary-600">Moderner</span>
                  <span class="text-primary-600">Opvallend</span>
                  <span class="text-primary-600">Zichtbaar</span>
                  <span class="text-primary-600">Frisser</span>
                  <span class="text-primary-600">Herkenbaar</span>
                  <span class="text-primary-600">Authentiek</span>
                  <span class="text-primary-600">Betrouwbaar</span>
                </div> -->
              </div>
            </div>
          </h1>
          <!-- <p class="text-white max-w-md leading-relaxed text-center m-auto">
            Hallo! Mijn naam is Martijn van Driest. Aangenaam kennis te maken. Ik ben een Grafisch Ontwerper uit Nederland.
          </p> -->
        </div>
      </div>
    </LayoutTheContainer>
  </section>
</template>

<style lang="scss" scoped>

.ani{
  animation: slide 10s steps(8) infinite;
  overflow: hidden;
  transition-timing-function: ease-in-out;
}
.animb{
  animation: slidemb 10s steps(8) infinite;
  overflow: hidden;
  transition-timing-function: ease-in-out;
  @media (min-width: 768px) {
    animation: slide 10s steps(8) infinite;
  }
}
@keyframes slide {
  100%{
    margin-top: -600px;
  }
}
@keyframes slidemb {
  100%{
    margin-top: -396px;
  }
}
</style>
