import tailwindcss from "@tailwindcss/vite";

const modules = ['@nuxt/content', '@nuxt/image', 'nuxt-headlessui', '@nuxt/icon']

// Studio is intended for local authoring; keep it out of production builds.
if (process.env.NODE_ENV !== 'production') {
  modules.push('@nuxthq/studio')
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules,

  devtools: {
    enabled: true
  },

  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap' },
        { rel: 'stylesheet', href: 'https://use.typekit.net/vrz2dth.css' }
      ]
    }
  },

  content: {

  },
  css: [
    './app/assets/css/tailwind.css',
    './app/assets/css/loader.css',
    './app/assets/css/lenis.css',
  ],

  compatibilityDate: 'latest',
  vite: {
    plugins: [
      tailwindcss() as any
    ],
  }
})
