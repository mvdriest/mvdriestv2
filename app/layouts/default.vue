<template>
  <div class="scroll-smooth">
    <!-- <LayoutTheNavbar /> -->
    <ProgressNav class="hidden md:block" />
    <TwoStepMobileNav class="md:hidden" />
    <main>
      <slot />
    </main>
    <LayoutTheFooter />
  </div>
</template>
