<script setup lang="ts">
  import type { LetterState } from '@/enums'

  const props = defineProps<{
    letter: string
    letterState: LetterState
  }>()
</script>

<template>
  <div
    class="LetterSquare"
    :class="letterState.toLowerCase()"
  >
    {{ props.letter }}
  </div>
</template>

<style lang="scss" scoped>
  .LetterSquare {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    color: #333;
    border: 3px solid #888;

    &.default {
      background-color: none;
    }
    &.absent {
      background-color: #333;
      border-color: #333;
      color: #fff;
    }
    &.correct {
      background-color: #15b815;
      border-color: #15b815;
      color: #fff;
    }
    &.present {
      background-color: #ffd000;
      border-color: #ffd000;
      color: #fff;
    }
  }
</style>
