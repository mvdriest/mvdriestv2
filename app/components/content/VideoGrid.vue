<script setup lang="ts">
import { computed } from 'vue'

interface VideoItem {
  url: string;
  title?: string;
}

interface Props {
  videos: VideoItem[];
  columns?: number;
}

const props = defineProps<Props>()

const columnsLg = computed(() => {
  const value = Number(props.columns ?? 2)
  if (Number.isFinite(value) && value > 0) {
    return Math.min(6, Math.max(1, Math.floor(value)))
  }
  return 2
})

const gridStyle = computed(() => ({
  '--columns-lg': String(columnsLg.value)
}) as Record<string, string>)

const parseStartSeconds = (input: string) => {
  if (!input) {
    return 0
  }

  if (/^\d+$/.test(input)) {
    return Number(input)
  }

  const match = input.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/)
  if (!match) {
    return 0
  }

  const hours = Number(match[1] || 0)
  const minutes = Number(match[2] || 0)
  const seconds = Number(match[3] || 0)

  return (hours * 3600) + (minutes * 60) + seconds
}

const toEmbedUrl = (rawUrl: string) => {
  try {
    const url = new URL(rawUrl)
    let videoId = ''

    // Instagram embeds
    // Supports: /p/{shortcode}/, /reel/{shortcode}/, /tv/{shortcode}/
    if (url.hostname.includes('instagram.com')) {
      const parts = url.pathname.split('/').filter(Boolean)
      const type = parts[0] || ''
      const shortcode = parts[1] || ''

      if ((type === 'p' || type === 'reel' || type === 'tv') && shortcode) {
        return `https://www.instagram.com/${type}/${shortcode}/embed`
      }

      return rawUrl
    }

    if (url.hostname.includes('youtu.be')) {
      videoId = url.pathname.replace('/', '')
    }

    if (url.hostname.includes('youtube.com')) {
      videoId = url.searchParams.get('v') || ''
      if (!videoId && url.pathname.startsWith('/shorts/')) {
        videoId = url.pathname.replace('/shorts/', '').split('/')[0] || ''
      }
    }

    if (!videoId) {
      return rawUrl
    }

    const startParam = url.searchParams.get('t') || url.searchParams.get('start') || ''
    const start = parseStartSeconds(startParam)

    return `https://www.youtube.com/embed/${videoId}${start > 0 ? `?start=${start}` : ''}`
  }
  catch {
    return rawUrl
  }
}

const embedVideos = computed(() => {
  return (props.videos || []).map((video, index) => ({
    title: video.title || `Video ${index + 1}`,
    embedUrl: toEmbedUrl(video.url)
  }))
})

const frameStyle = (embedUrl: string) => {
  const style: Record<string, string> = {}

  try {
    const url = new URL(embedUrl)

    if (url.hostname.includes('instagram.com')) {
      const parts = url.pathname.split('/').filter(Boolean)
      const type = parts[0] || ''

      // Keep sizing consistent for posts + older IGTV embeds
      if (type === 'p' || type === 'tv') {
        style.aspectRatio = '1 / 1'
        style.minHeight = '520px'
        return style
      }

      if (type === 'reel') {
        style.aspectRatio = '9 / 16'
        style.minHeight = '700px'
        return style
      }
    }

    style.aspectRatio = '16 / 9'
    return style
  }
  catch {
    style.aspectRatio = '16 / 9'
    return style
  }
}
</script>

<template>
  <div class="video-grid" :style="gridStyle">
    <article
      v-for="(video, index) in embedVideos"
      :key="`${video.title}-${index}`"
      class="video-grid__item"
    >
      <iframe
        class="video-grid__frame"
        :src="video.embedUrl"
        :title="video.title"
        :style="frameStyle(video.embedUrl)"
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
    </article>
  </div>
</template>

<style scoped>
.video-grid {
  --columns-lg: 2;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.video-grid__item {
  width: 100%;
  overflow: hidden;
  border-radius: 20px;
}

.video-grid__frame {
  display: block;
  width: 100%;
  border: 0;
}

@media (min-width: 1024px) {
  .video-grid {
    grid-template-columns: repeat(var(--columns-lg), minmax(0, 1fr));
  }
}
</style>