function configureInlineAutoplay(video: HTMLVideoElement) {
  // iOS/Safari is picky: ensure properties are set as well as attributes.
  video.muted = true
  video.defaultMuted = true
  video.autoplay = true
  video.loop = true
  ;(video as any).playsInline = true

  // Help the browser buffer enough to start without user interaction.
  if (!video.getAttribute('preload')) video.preload = 'auto'

  video.setAttribute('muted', '')
  video.setAttribute('autoplay', '')
  video.setAttribute('loop', '')
  video.setAttribute('playsinline', '')
  video.setAttribute('webkit-playsinline', '')
}

async function tryPlay(video: HTMLVideoElement) {
  try {
    configureInlineAutoplay(video)
    if (video.ended) video.currentTime = 0

    // Ensure we actually start fetching if the element was created lazily.
    if (video.readyState === 0) {
      try {
        video.load()
      } catch {
        // ignore
      }
    }

    const result = video.play()
    if (result && typeof (result as Promise<void>).catch === 'function') {
      await (result as Promise<void>).catch(() => {})
    }
  } catch {
    // Ignore; autoplay can be blocked until a user gesture.
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const selector = 'video[data-autoplay-inline]'

  const initialized = new WeakSet<HTMLVideoElement>()

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const video = entry.target as HTMLVideoElement
        void tryPlay(video)
      }
    },
    {
      root: null,
      // Start a bit before it's fully visible to avoid “first frame pause”.
      rootMargin: '200px 0px 200px 0px',
      threshold: 0.01,
    },
  )

  const refresh = () => {
    const videos = Array.from(document.querySelectorAll(selector)) as HTMLVideoElement[]
    for (const video of videos) {
      if (initialized.has(video)) continue
      initialized.add(video)

      // Try immediately, on media readiness, and when it enters the viewport.
      void tryPlay(video)
      const retry = () => void tryPlay(video)
      video.addEventListener('loadedmetadata', retry)
      video.addEventListener('canplay', retry)
      io.observe(video)

      // Some mobile browsers need a little time after layout.
      window.setTimeout(retry, 200)
      window.setTimeout(retry, 800)
      window.setTimeout(retry, 2000)
    }
  }

  const refreshSoon = () => {
    refresh()
    // Extra passes help on Safari where layout/hydration can lag.
    requestAnimationFrame(refresh)
    window.setTimeout(refresh, 50)
    window.setTimeout(refresh, 250)
    window.setTimeout(refresh, 1000)
  }

  nuxtApp.hook('app:mounted', refreshSoon)
  nuxtApp.hook('page:finish', refreshSoon)

  // Fallback: on iOS a first user gesture often unlocks autoplay.
  const opts: AddEventListenerOptions = { passive: true, capture: true }
  const onFirstGesture = () => {
    refresh()
    window.removeEventListener('touchstart', onFirstGesture, opts)
    window.removeEventListener('pointerdown', onFirstGesture, opts)
    window.removeEventListener('scroll', onFirstGesture, opts)
  }

  window.addEventListener('touchstart', onFirstGesture, opts)
  window.addEventListener('pointerdown', onFirstGesture, opts)
  window.addEventListener('scroll', onFirstGesture, opts)

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) refresh()
  })

  window.addEventListener('pageshow', refresh)
})
