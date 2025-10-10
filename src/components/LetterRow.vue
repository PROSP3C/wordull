<script lang="ts" setup>
  import { useGameLogicStore } from '@/stores/gameLogic'
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'

  const { isGuessInvalidWord } = storeToRefs(useGameLogicStore())

  const isInvalidWord = computed(() => !!isGuessInvalidWord.value)
</script>

<template>
  <div
    class="LetterRow row q-gutter-sm"
    :class="isInvalidWord ? 'isInvalidWord' : ''"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .LetterRow {
    &.isInvalidWord {
      animation: isInvalidWord 0.5s ease-in-out;
    }

    @keyframes isInvalidWord {
      0% {
        transform: translateX(0);
      }
      20% {
        transform: translateX(-5px);
      }
      40% {
        transform: translateX(5px);
      }
      60% {
        transform: translateX(-5px);
      }
      80% {
        transform: translateX(5px);
      }
      100% {
        transform: translateX(0);
      }
    }
  }
</style>
