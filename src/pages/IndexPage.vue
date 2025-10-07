<script setup lang="ts">
  import KeyboardWrapper from '@/components/KeyboardWrapper.vue'

  import LetterSquare from '@/components/LetterSquare.vue'
  import { LetterSquareState, KeyState } from '@/enums'

  const keys = [
    [
      { letter: 'Q', keyState: KeyState.Default },
      { letter: 'W', keyState: KeyState.Default },
      { letter: 'E', keyState: KeyState.Default },
      { letter: 'R', keyState: KeyState.Default },
      { letter: 'T', keyState: KeyState.Default },
      { letter: 'Y', keyState: KeyState.Default },
      { letter: 'U', keyState: KeyState.Default },
      { letter: 'I', keyState: KeyState.Default },
      { letter: 'O', keyState: KeyState.Default },
      { letter: 'P', keyState: KeyState.Default },
    ],
    [
      { letter: 'A', keyState: KeyState.Default },
      { letter: 'S', keyState: KeyState.Default },
      { letter: 'D', keyState: KeyState.Default },
      { letter: 'F', keyState: KeyState.Default },
      { letter: 'G', keyState: KeyState.Default },
      { letter: 'H', keyState: KeyState.Default },
      { letter: 'J', keyState: KeyState.Default },
      { letter: 'K', keyState: KeyState.Default },
      { letter: 'L', keyState: KeyState.Default },
    ],
    [
      { letter: 'Enter', keyState: KeyState.Default },
      { letter: 'Z', keyState: KeyState.Default },
      { letter: 'X', keyState: KeyState.Default },
      { letter: 'C', keyState: KeyState.Default },
      { letter: 'V', keyState: KeyState.Default },
      { letter: 'B', keyState: KeyState.Default },
      { letter: 'N', keyState: KeyState.Default },
      { letter: 'M', keyState: KeyState.Default },
      { letter: '<', keyState: KeyState.Default },
    ],
  ]
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <letter-square
      letter="C"
      :letter-square-state="LetterSquareState.Absent"
    />
    <letter-square
      letter="B"
      :letter-square-state="LetterSquareState.Absent"
    />
    <letter-square
      letter="C"
      :letter-square-state="LetterSquareState.Correct"
    />
    <letter-square
      letter="D"
      :letter-square-state="LetterSquareState.Present"
    />
    <letter-square
      letter="E"
      :letter-square-state="LetterSquareState.Absent"
    />

    <KeyboardWrapper :keys="keys" />
  </q-page>
</template>
