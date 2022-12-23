<script lang="ts" setup>
const props = defineProps({
    blok: {
        type: Object,
        required: true,
    }
})
</script>

<template>
    <main>
        <component :is="blok.component" v-for="blokItem in blok.body" :key="blokItem._id" :blok="blokItem"></component>
    </main>
</template>