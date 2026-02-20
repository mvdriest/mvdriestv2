<template>
  <div class="container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.container:not(.disabled) {
  max-width: 1400px;
  margin: 0 auto;
  @media (max-width: 2100px) {
    max-width: 1400px;
  }
  @media (max-width: 1800px) {
    max-width: 1300px;
  }
  @media (max-width: 1600px) {
    max-width: 1100px;
  }
  @media (max-width: 1300px) {
    max-width: 900px;
  }
  @media (max-width: 1100px) {
    max-width: 90%;
  }
}
</style>
