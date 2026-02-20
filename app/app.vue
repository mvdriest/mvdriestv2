<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <LogoLoader
    v-if="route.path === '/' && !loaderFinished"
    @done="startPage"
  />
</template>



<script setup>
const route = useRoute()

const loaderSeen = useCookie("loaderSeen", {
  default: () => "false"
})

const loaderFinished = useState('loaderFinished', () => loaderSeen.value === "true")

const startPage = () => {
  loaderFinished.value = true
  loaderSeen.value = "true"
}
</script>