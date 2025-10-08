<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useGameLogicStore } from '@/stores/gameLogic'
  import KeyboardWrapper from '@/components/KeyboardWrapper.vue'
  import LetterRow from '@/components/LetterRow.vue'
  import LetterSquare from '@/components/LetterSquare.vue'
  import { GameState } from '@/enums'

  const { guesses, keys, gameState } = storeToRefs(useGameLogicStore())

  const onStartGame = () => {
    const gameLogicStore = useGameLogicStore()
    gameLogicStore.startGame()
  }
</script>

<template>
  <q-page class="IndexPage flex justify-center">
    <div
      v-if="gameState === GameState.Ready"
      class="flex column justify-center items-center"
    >
      <h1>Wordull</h1>
      <q-btn
        color="primary"
        icon-right="play_arrow"
        @click="onStartGame()"
      />
    </div>
    <div
      v-if="gameState === GameState.Playing"
      class="flex column justify-evenly items-center"
    >
      <div class="flex column q-gutter-sm">
        <LetterRow
          v-for="(row, guessIndex) in guesses"
          :key="guessIndex"
        >
          <letter-square
            v-for="(letter, letterIndex) in row"
            :key="letterIndex"
            :letter="letter.letter"
            :letter-state="letter.letterState"
            :has-guessed="letter.hasGuessed"
          />
        </LetterRow>
      </div>

      <KeyboardWrapper :keys="keys" />
    </div>
    <div
      v-if="gameState === GameState.Lost"
      class="flex column justify-center items-center"
    >
      <h1>You Lost!</h1>
      <q-btn
        color="primary"
        icon-right="restart_alt"
        @click="onStartGame()"
      />
    </div>
    <div
      v-if="gameState === GameState.Won"
      class="flex column justify-center items-center"
    >
      <h1>You Won!</h1>
      <q-btn
        color="primary"
        icon-right="restart_alt"
        @click="onStartGame()"
      />
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
  .IndexPage {
    height: 100%;
    background: #111;
    color: #fff;

    h1 {
      font-size: 4rem;
      margin-bottom: 1rem;
      font-weight: bold;
    }
  }
</style>
