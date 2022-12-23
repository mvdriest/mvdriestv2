<template>
  <div class="layout">
    <LayoutNavbar />
    <main>
      <slot/>
    </main>
    <LayoutFooter />
  </div>
</template>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>