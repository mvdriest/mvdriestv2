<script lang="ts" setup>
interface Props {
    images: string[];
    gallery: string;
    baseDir: string;
}

const props = defineProps<Props>();
</script>

<template>
    <section class="overflow-hidden text-neutral-700">
        <div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
            <div class="-m-1 flex flex-wrap md:-m-2">
            <div class="flex w-1/3 flex-wrap" v-for="(image, key) in props.images" :key="key">
                <div class="w-full p-1 md:p-2">
                <nuxt-img
                    alt="gallery"
                    class="block h-full w-full rounded-lg object-cover object-center"
                    :src="`/images/projecten/${baseDir}/${gallery}/${image}`"
                    format="webp" />
                </div>
            </div>
            </div>
        </div>
    </section>
</template>