<script lang="ts" setup>
  import type { LetterState } from '@/enums'
  import { useGameLogicStore } from '@/stores/gameLogic'

  const props = defineProps<{
    letter: string
    letterState: LetterState
  }>()

  const handleClick = (letter: string) => {
    if (letter === 'Enter') {
      useGameLogicStore().handleGuess()
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
    background-color: #333;
    border-radius: 4px;
    user-select: none;

    &.default {
      background-color: #888;
    }
    &.absent {
      background-color: #333;
    }
    &.correct {
      background-color: #15b815;
    }
  }
</style>
