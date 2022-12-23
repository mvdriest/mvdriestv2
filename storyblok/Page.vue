<template>
<main>
    <StoryblokComponent
        v-for="blok in blok.body"
        :key="blok._uid"
        :blok="blok"
    />
</main>
</template>

<script setup>
defineProps({blok: Object});
</script>
