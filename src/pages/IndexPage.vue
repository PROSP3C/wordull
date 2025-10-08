<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useGameLogicStore } from '@/stores/gameLogic'
  import KeyboardWrapper from '@/components/KeyboardWrapper.vue'
  import LetterRow from '@/components/LetterRow.vue'
  import LetterSquare from '@/components/LetterSquare.vue'

  const { guesses, keys } = storeToRefs(useGameLogicStore())
</script>

<template>
  <q-page class="flex column justify-evenly items-center">
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
  </q-page>
</template>
