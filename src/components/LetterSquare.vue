<script setup lang="ts">
  import { ref } from 'vue'
  import { LetterSquareState } from '@/enums'

  const props = defineProps<{
    letter: string
    letterSquareState: LetterSquareState
  }>()

  const currentLetterSquareState = ref<LetterSquareState>(
    props.letterSquareState || LetterSquareState.Default,
  )
</script>

<template>
  <div
    class="LetterSquare"
    :class="currentLetterSquareState.toLowerCase()"
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
    color: #fff;
    border: 3px solid #555;

    &.default {
      background-color: none;
    }
    &.absent {
      background-color: #5e5e5e;
      border-color: #5e5e5e;
    }
    &.correct {
      background-color: #15b815;
      border-color: #15b815;
    }
    &.present {
      background-color: #ffd000;
      border-color: #ffd000;
    }
  }
</style>
