// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxt/image', 'nuxt-headlessui', '@nuxthq/studio', '@nuxt/icon'],

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

  compatibilityDate: '2024-08-06'
})
