<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useGameLogicStore } from '@/stores/gameLogic'
  import KeyboardWrapper from '@/components/KeyboardWrapper.vue'
  import LetterRow from '@/components/LetterRow.vue'
  import LetterSquare from '@/components/LetterSquare.vue'
  import { GameState } from '@/enums'
  import { computed, ref } from 'vue'

  const { guesses, keys, gameState, currentRowGuessIndex, solution } =
    storeToRefs(useGameLogicStore())

  const seeBoardFromDialog = ref(false)
  const hasWon = computed(
    () => gameState.value === GameState.Won && !seeBoardFromDialog.value,
  )
  const hasLost = computed(
    () => gameState.value === GameState.Lost && !seeBoardFromDialog.value,
  )

  const onStartGame = async () => {
    const gameLogicStore = useGameLogicStore()
    await gameLogicStore.startGame()
  }

  const onSeeBoard = () => {
    seeBoardFromDialog.value = true
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
      v-else
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
    <q-dialog v-model="hasLost">
      <div class="IndexPage-dialog flex column justify-center items-center">
        <h2>You Lost...</h2>
        <p>
          The word was <b>{{ solution }}</b
          >. Better luck next time.
        </p>
        <q-btn
          color="primary"
          label="New Game"
          icon-right="restart_alt"
          @click="onStartGame()"
        />
        <q-btn
          color="secondary"
          label="See Board"
          icon-right="visibility"
          @click="onSeeBoard()"
        />
      </div>
    </q-dialog>
    <q-dialog v-model="hasWon">
      <div class="IndexPage-dialog flex column justify-center items-center">
        <h2>Well Done!</h2>
        <p>
          You solved Wordull in {{ currentRowGuessIndex + 1 }} guess{{
            currentRowGuessIndex + 1 > 1 ? 'es' : ''
          }}!
        </p>
        <q-btn
          color="primary"
          label="New Game"
          icon-right="restart_alt"
          @click="onStartGame()"
        />
        <q-btn
          color="secondary"
          label="See Board"
          icon-right="visibility"
          @click="onSeeBoard()"
        />
      </div>
    </q-dialog>
    <q-dialog
      v-model="seeBoardFromDialog"
      position="top"
    >
      <q-btn
        color="primary"
        label="See Stats"
        icon-right="info"
        @click="seeBoardFromDialog = false"
      ></q-btn>
    </q-dialog>
  </q-page>
</template>

<style lang="scss" scoped>
  .IndexPage {
    height: 100%;
    width: 100%;
    background: #111;
    color: #fff;

    h1 {
      font-size: 4rem;
      margin-bottom: 1rem;
      font-weight: bold;
    }

    &-dialog {
      background: #111;
      padding: 3rem;
      border-radius: 4px;
      color: #fff;

      h2 {
        margin: 0 0 2rem 0;
      }

      b {
        color: #ffd000;
      }

      button {
        margin-top: 1rem;
      }
    }
  }
</style>
