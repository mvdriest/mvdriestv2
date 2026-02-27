<template>
  <a :href="href" class="btn-icon-link" @click.prevent="onClick">
    <div class="btn-icon-content" :class="{'color--white': variant === 'white'}">
      <div class="btn-icon-content__mask">
        <span data-button-anim-target class="btn-icon-content__text">{{ label }}</span>
      </div>

      <div data-icon-size="normal" class="btn-icon-icon">
        <div data-button-anim-target class="btn-icon-icon__bg"></div>
        <div class="btn-icon-icon__wrap" :class="{'color--white': variant === 'white'}">
          <div class="btn-icon-icon__list">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 10 8" fill="none" data-button-anim-target class="btn-icon-icon__arrow"><path d="M4.45231 0.385986H6.02531L9.30131 3.99999L6.02531 7.61399H4.45231L7.40331 4.58499H0.695312V3.42799H7.41631L4.45231 0.385986Z" fill="currentColor"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 10 8" fill="none" data-button-anim-target class="btn-icon-icon__arrow"><path d="M4.45231 0.385986H6.02531L9.30131 3.99999L6.02531 7.61399H4.45231L7.40331 4.58499H0.695312V3.42799H7.41631L4.45231 0.385986Z" fill="currentColor"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 10 8" fill="none" data-button-anim-target class="btn-icon-icon__arrow"><path d="M4.45231 0.385986H6.02531L9.30131 3.99999L6.02531 7.61399H4.45231L7.40331 4.58499H0.695312V3.42799H7.41631L4.45231 0.385986Z" fill="currentColor"></path></svg>
          </div>
        </div>
      </div>

      <div data-button-anim-target class="btn-icon-content__bg"></div>
    </div>
  </a>
</template>

<script setup lang="ts">
// defineProps and defineEmits are compiler macros in <script setup> — do not import them at runtime

const props = defineProps({
  label: { type: String, default: 'Button with Icon' },
  href: { type: String, default: '#' },
  variant: { type: String, default: 'primary' } // 'primary' | 'white'
})

const emit = defineEmits(['click'])

function onClick(e: Event) {
  emit('click', e)
}
</script>

<style scoped>
.btn-group {
  grid-column-gap: 3em;
  grid-row-gap: 3em;
  justify-content: center;
  display: flex;
}

.btn-icon-link {
  grid-column-gap: .5em;
  grid-row-gap: .5em;
  color: #a29a65;
  font-size: 1em;
  line-height: 1.2;
  text-decoration: none;
  display: flex;
}

.btn-icon-icon {
  z-index: 1;
  flex: none;
  justify-content: center;
  align-items: center;
  /* increased size so the icon appears larger relative to the text */
  width: 1.6em;
  height: 1.6em;
  display: flex;
  position: relative;
}

.btn-icon-icon__bg {
  background-color: currentColor;
  border-radius: .125em;
  width: 100%;
  height: 100%;
  position: absolute;
}

.btn-icon-icon__wrap {
  color: #6F6F6F;
  /* center the arrow horizontally and vertically */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
}

.btn-icon-icon__wrap.color--white {
  color: #fff;
}

.btn-icon-icon__list {
  flex: none;
  justify-content: center;
  align-items: center;
  height: 100%;
  display: flex;
}

.btn-icon-icon__arrow {
  flex: none;
  /* slightly smaller padding so the svg sits central */
  width: 1.25em;
  height: 100%;
  padding: .08em;
  display: block;
}

.btn-icon-content {
  grid-column-gap: .5em;
  grid-row-gap: .5em;
  color: #fff;
  background-color: #6F6F6F;
  border-radius: .25em;
  justify-content: flex-start;
  align-items: center;
  padding: .6125em .75em;
  display: flex;
  position: relative;
  overflow: hidden;
}

.btn-icon-content__text {
  font-size: 22px;
  font-family: var(--font-family-helvetica);
  --tw-font-weight: var(--font-weight-semibold);
  font-weight: var(--font-weight-semibold);
  --tw-tracking: calc(1px * -1);
  letter-spacing: calc(1px * -1);
}

.btn-icon-content__mask {
  z-index: 1;
  flex: none;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  position: relative;
  overflow: hidden;
}

.btn-icon-content__bg {
  z-index: 0;
  background-color: #a3a3a3;
  width: 120%;
  height: 100%;
  position: absolute;
  bottom: 0%;
  left: -20%;
  transform: translate(0, 175%) rotate(15deg);
}

/* Global attribute to easily control easing and timing of all targetted elements */
[data-button-anim-target]{
  transition: transform 0.525s cubic-bezier(0.625, 0.05, 0, 1);
}

/* Fake a duplicate text element using text shadow without blur  */
/* We save the distance in a variable for easy use in the CSS animation */
.btn-icon-content__text{
  --text-duplicate-distance: 1.5em;
  text-shadow: 0px var(--text-duplicate-distance) currentColor;
}

/* Only apply hover animations if they are actually not supported */
@media (hover:hover) and (pointer:fine){

  .btn-icon-link:hover .btn-icon-content__text{ transform: translate(0px, calc(-1 * var(--text-duplicate-distance))); }
    
  .btn-icon-link:hover .btn-icon-icon__bg{ transform: rotate(90deg); }
  
  /* smaller translate so stacked arrows stay inside the icon box */
  .btn-icon-link:hover .btn-icon-icon__arrow{ transform: translate(100%, 0px); }
  
  .btn-icon-link:hover .btn-icon-content__bg{ transform: translate(0px, 0%) rotate(0deg); }
  
}
</style>
