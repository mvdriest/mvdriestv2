import Lenis from 'lenis'

export default defineNuxtPlugin((nuxtApp) => {
  const lenis = new Lenis({
    duration: 0.8,
    smoothWheel: true,
    smoothTouch: false,
  })

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  // optioneel: globally beschikbaar maken
  return {
    provide: {
      lenis,
    },
  }
})
