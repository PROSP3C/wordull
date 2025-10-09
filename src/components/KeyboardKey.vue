<script lang="ts" setup>
  import type { LetterState } from '@/enums'
  import { useGameLogicStore } from '@/stores/gameLogic'

  const props = defineProps<{
    letter: string
    letterState: LetterState
  }>()

  const handleClick = async (letter: string) => {
    if (letter === 'Enter') {
      await useGameLogicStore().handleGuess()
      return
    }

    if (letter === 'Backspace') {
      useGameLogicStore().handleBackspace()
      return
    }

    useGameLogicStore().handleLetterInput(letter)
  }
</script>

<template>
  <div
    class="KeyboardKey"
    :class="props.letterState.toLowerCase()"
    @click="() => handleClick(props.letter)"
  >
    <template v-if="props.letter === 'Backspace'">
      <q-icon name="backspace" />
    </template>

    <template v-else>
      {{ props.letter }}
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .KeyboardKey {
    width: auto;
    min-width: 2.2rem;
    height: 3.5rem;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    background-color: #888;
    border-radius: 4px;
    user-select: none;

    &.absent {
      animation: flipTileAbsent 1s ease forwards;
    }
    &.present {
      animation: flipTileCorrect 1s ease forwards;
    }
    &.correct {
      animation: flipTilePresent 1s ease forwards;
    }

    @keyframes flipTileAbsent {
      0% {
        transform: rotateX(0deg);
        background: #888;
      }
      50% {
        transform: rotateX(90deg);
        background: #888;
      }
      51% {
        transform: rotateX(90deg);
        background: #333;
      }
      100% {
        transform: rotateX(0deg);
        background: #333;
      }
    }
    @keyframes flipTileCorrent {
      0% {
        transform: rotateX(0deg);
        background: #333;
      }
      50% {
        transform: rotateX(90deg);
        background: #333;
      }
      51% {
        transform: rotateX(90deg);
        background: #15b815;
      }
      100% {
        transform: rotateX(0deg);
        background: #15b815;
      }
    }
    @keyframes flipTilePresent {
      0% {
        transform: rotateX(0deg);
        background: #333;
      }
      50% {
        transform: rotateX(90deg);
        background: #333;
      }
      51% {
        transform: rotateX(90deg);
        background: #ffd000;
      }
      100% {
        transform: rotateX(0deg);
        background: #ffd000;
      }
    }
  }
</style>
