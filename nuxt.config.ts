// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        ['@storyblok/nuxt', { accessToken: process.env.STORYBLOK_API_KEY }]
    ],
    css: [
        '@/assets/style/global.scss',
        '@/assets/style/colors.scss'
    ]
})
