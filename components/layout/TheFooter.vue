<template>
  <footer
    class="border-t-2 border-solid border-dark-500 bg-dark-600 py-24 text-white"
  >
    <LayoutTheContainer>
      <img
        src="https://uploads-ssl.webflow.com/61df3d19f28c1371429c6b39/6205155254ddece058ef5179_Logo-mvdriest-geel.png"
        loading="lazy"
        width="98"
        srcset="
          https://uploads-ssl.webflow.com/61df3d19f28c1371429c6b39/6205155254ddece058ef5179_Logo-mvdriest-geel-p-500.png   500w,
          https://uploads-ssl.webflow.com/61df3d19f28c1371429c6b39/6205155254ddece058ef5179_Logo-mvdriest-geel-p-800.png   800w,
          https://uploads-ssl.webflow.com/61df3d19f28c1371429c6b39/6205155254ddece058ef5179_Logo-mvdriest-geel-p-1080.png 1080w,
          https://uploads-ssl.webflow.com/61df3d19f28c1371429c6b39/6205155254ddece058ef5179_Logo-mvdriest-geel.png        2000w
        "
        sizes="(max-width: 479px) 100vw, 98px"
        alt=""
      >
      <div class="my-12 gap-12 flex flex-col md:flex-row md:justify-between">
        <div class="flex flex-col gap-12 md:flex-row md:gap-20">
          <div class="flex flex-col">
            <h1 class="max-w-sm text-3xl leading-8 font-semibold mb-8">
              Laten we contact maken en elkaar leren kennen
            </h1>
            <a
              href="tel:0645506565"
              class="hover:text-primary-600 pointer no-underline"
            >+31 6 45506565</a>
            <a
              href="mail:Martijn.vandriest@gmail.com"
              class="mt-5 hover:text-primary-600 pointer no-underline"
            >info@mvdriest.nl</a>
          </div>
          <div class="pages">
            <h1 class="mb-6 text-xl leading-5 font-bold">
              Pagina's
            </h1>
            <div class="flex flex-col gap-5">
              <NuxtLink
                to="/"
                class="hover:text-primary-600 pointer no-underline"
              >
                Voorpagina
              </NuxtLink>
              <NuxtLink
                to="/over-mij"
                class="hover:text-primary-600 pointer no-underline"
              >
                Over mij
              </NuxtLink>
              <NuxtLink
                to="/portfolio"
                class="hover:text-primary-600 pointer no-underline"
              >
                Portfolio
              </NuxtLink>
            </div>
          </div>
        </div>
        <SocialsList color="yellow" direction="column" />
      </div>
      <div
        class="flex gap-2.5 flex-col md:flex-row border-t-2 border-solid border-dark-500 pt-5 justify-between"
      >
        <p>© {{ new Date().getFullYear() }} Martijn van Driest</p>
        <a href="">Privacy verklaring</a>
      </div>
    </LayoutTheContainer>
  </footer>
</template>
