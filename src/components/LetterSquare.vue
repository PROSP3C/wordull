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
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    width: 2.25rem;
    height: 2.25rem;
    font-weight: bold;
    color: #fff;
    border: 3px solid #888;
    background: none;

    @media screen and (min-width: 330px) and (min-height: 550px) {
      font-size: 24px;
      width: 3rem;
      height: 3rem;
    }

    &.absent {
      animation: flipTileAbsent 1s ease forwards;
    }
    &.correct {
      animation: flipTileCorrent 1s ease forwards;
    }
    &.present {
      animation: flipTilePresent 1s ease forwards;
    }

    @keyframes flipTileAbsent {
      0% {
        transform: rotateX(0deg);
        background: none;
        border: 3px solid #888;
      }
      50% {
        transform: rotateX(90deg);
        background: none;
        border: 3px solid #888;
      }
      51% {
        transform: rotateX(90deg);
        background: #333;
        border: #333;
      }
      100% {
        transform: rotateX(0deg);
        background: #333;
        border: #333;
      }
    }
    @keyframes flipTileCorrent {
      0% {
        transform: rotateX(0deg);
        background: none;
        border: 3px solid #888;
      }
      50% {
        transform: rotateX(90deg);
        background: none;
        border: 3px solid #888;
      }
      51% {
        transform: rotateX(90deg);
        background: #15b815;
        border: #15b815;
      }
      100% {
        transform: rotateX(0deg);
        background: #15b815;
        border: #15b815;
      }
    }
    @keyframes flipTilePresent {
      0% {
        transform: rotateX(0deg);
        background: none;
        border: 3px solid #888;
      }
      50% {
        transform: rotateX(90deg);
        background: none;
        border: 3px solid #888;
      }
      51% {
        transform: rotateX(90deg);
        background: #ffd000;
        border: #ffd000;
      }
      100% {
        transform: rotateX(0deg);
        background: #ffd000;
        border: #ffd000;
      }
    }
  }
</style>
