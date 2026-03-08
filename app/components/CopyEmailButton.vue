<template>
  <div class="copy-email-wrapper">
    <button
      :aria-label="ariaLabel"
      :data-copy-button="copyState"
      class="copy-email-button"
      @click="handleInteraction"
      @keydown="handleInteraction"
      @mouseleave="resetState"
      @blur="resetState"
    >
      <div class="copy-email-icon__wrap">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewbox="0 0 24 24" fill="none">
          <path d="M16 2H8V5H16V2Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M16 3H17.5L19 4.5V19.5L17.5 21H6.5L5 19.5V4.5L6.5 3H8" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </div>
      <div class="copy-email-text__wrap">
        <span data-copy-email-element="" class="copy-email-text__el">{{ email }}</span>
        <span class="copy-email-text__el">Click to copy email</span>
        <span class="copy-email-text__el">Copied to clipboard!</span>
      </div>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  email: {
    type: String,
    default: 'hello@osmo.supply'
  }
})

const copyState = ref('')
const ariaLabel = ref('Copy email to clipboard')

const copyEmail = () => {
  if (props.email) {
    navigator.clipboard.writeText(props.email).then(() => {
      copyState.value = 'copied'
      ariaLabel.value = 'Email copied to clipboard!'
    })
  }
}

const handleInteraction = (e) => {
  if (
    e.type === 'click' ||
    (e.type === 'keydown' && (e.key === 'Enter' || e.key === ' '))
  ) {
    e.preventDefault()
    copyEmail()
  }
}

const resetState = () => {
  copyState.value = ''
  ariaLabel.value = 'Copy email to clipboard'
}
</script>

<style scoped>
/* .copy-email-wrapper {
  grid-column-gap: 2em;
  grid-row-gap: 2em;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  display: flex;
} */

.copy-email-eyebrow {
  opacity: 0.5;
  text-align: center;
  margin-bottom: 0;
  font-size: 1em;
  line-height: 1;
}

.copy-email-button {
  grid-column-gap: 0.5em;
  grid-row-gap: 0.5em;
  background-color: #fff;
  border-radius: 0.5em;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5em 0.75em 0.5em 0.5em;
  display: flex;
  border: none;
  cursor: pointer;
}

.copy-email-button:focus {
  outline-offset: 0px;
  border: 1px #000;
  outline: 3px #131313;
}

.copy-email-button:focus-visible,
.copy-email-button[data-wf-focus-visible] {
  outline-offset: 4px;
  border-style: none;
  outline: 2px solid #fff;
}

.copy-email-text__wrap {
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  height: 1.5em;
  line-height: 1.5;
  display: flex;
  overflow: hidden;
}

.copy-email-text__el {
  white-space: nowrap;
  font-size: 1rem;
  color: #1f2937;
  font-weight: 600;
  font-family: Helvetica, Arial, sans-serif;
  letter-spacing: -1px;
  text-transform: uppercase;
  transition: transform 0.45s cubic-bezier(0.65, 0, 0, 1);
}

.copy-email-icon__wrap {
  color: #fff;
  background-color: #212121;
  border-radius: 0.375em;
  justify-content: center;
  align-items: center;
  width: 2em;
  height: 2em;
  padding: 0.375em;
  transition: background-color 0.2s;
  display: flex;
  flex-shrink: 0;
}

/* Hover styling */
@media (hover: hover) {
  .copy-email-button:hover .copy-email-icon__wrap {
    background: #686868;
  }

  .copy-email-button:hover .copy-email-text__el {
    transform: translate(0px, -100%);
  }
}

/* Keyboard focus styling */
.copy-email-button:focus .copy-email-icon__wrap {
  background: rgba(34, 80, 46, 0.9);
}

.copy-email-button:focus .copy-email-text__el {
  transform: translate(0px, -100%);
}

/* 'Copied' state, when a user has clicked the button */
[data-copy-button="copied"] .copy-email-icon__wrap {
  background: #0f8e2e !important;
}

[data-copy-button="copied"] .copy-email-text__el {
  transform: translate(0px, -200%) !important;
}

@media screen and (max-width: 991px) {
  .copy-email-wrapper {
    font-size: 1em;
  }
}

@media screen and (max-width: 479px) {
  .copy-email-text__wrap {
    font-size: 1em;
  }
}
</style>
