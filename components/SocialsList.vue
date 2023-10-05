<script lang="ts" setup>
type Social = {
  imageUrl: {
    black: string;
    yellow: string;
  };
  name: string;
  link: string;
};

const socials: Social[] = [
  {
    imageUrl: {
      black:
        'https://a.storyblok.com/f/184315/x/a18966d378/behance-logo-black.svg',
      yellow: 'https://a.storyblok.com/f/184315/x/8755b5b016/behance-logo.svg'
    },
    name: 'Behance',
    link: 'https://www.behance.net/'
  },
  {
    imageUrl: {
      black: 'https://a.storyblok.com/f/184315/x/05f5a8d960/linkedin-black.svg',
      yellow: 'https://a.storyblok.com/f/184315/x/64ddef6393/linkedin.svg'
    },
    name: 'Linkedin',
    link: 'https://www.linkedin.com/'
  },
  {
    imageUrl: {
      black:
        'https://a.storyblok.com/f/184315/x/9ef610a519/instagram1-black.svg',
      yellow: 'https://a.storyblok.com/f/184315/x/797bf57e65/instagram1.svg'
    },
    name: 'Instagram',
    link: 'https://www.instagram.com/'
  }
]

type SocialColor = keyof Social['imageUrl'];

const props = defineProps<{
  color: SocialColor;
  direction: 'column' | 'row';
}>()
</script>

<template>
  <div
    :class="
      props.direction === 'row'
        ? 'flex items-center gap-5'
        : 'flex md:flex-col gap-5 md:items-end'
    "
  >
    <NuxtLink
      v-for="(social, i) in socials"
      :key="i"
      :href="social.link"
      target="_blank"
    >
      <nuxt-img :src="social.imageUrl[props.color]" :alt="social.name" />
    </NuxtLink>
  </div>
</template>
