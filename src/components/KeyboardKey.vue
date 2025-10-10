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
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 1.25rem;
    height: 3rem;
    padding: 0.5rem;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #888;
    border-radius: 4px;
    user-select: none;

    @media screen and (min-width: 330px) and (min-height: 550px) {
      min-width: 1.9rem;
      height: 3.25rem;
      padding: 0.5rem;
      font-size: 18px;
    }

    &.absent {
      background: #333;
    }
    &.present {
      background: #ffd000;
    }
    &.correct {
      background: #15b815;
    }
  }
</style>
