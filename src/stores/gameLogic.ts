import { defineStore, acceptHMRUpdate } from 'pinia'
import { GameState, LetterState } from '@/enums'
import type { AxiosResponse } from 'axios'
import { api } from '@/boot/axios'

const guessesDefault = [
  [
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
  ],
  [
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
  ],
  [
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
  ],
  [
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
  ],
  [
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
  ],
  [
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
    { letter: '', letterState: LetterState.Default, hasGuessed: false },
  ],
]

const keysDefault = [
  [
    { letter: 'Q', letterState: LetterState.Default },
    { letter: 'W', letterState: LetterState.Default },
    { letter: 'E', letterState: LetterState.Default },
    { letter: 'R', letterState: LetterState.Default },
    { letter: 'T', letterState: LetterState.Default },
    { letter: 'Y', letterState: LetterState.Default },
    { letter: 'U', letterState: LetterState.Default },
    { letter: 'I', letterState: LetterState.Default },
    { letter: 'O', letterState: LetterState.Default },
    { letter: 'P', letterState: LetterState.Default },
  ],
  [
    { letter: 'A', letterState: LetterState.Default },
    { letter: 'S', letterState: LetterState.Default },
    { letter: 'D', letterState: LetterState.Default },
    { letter: 'F', letterState: LetterState.Default },
    { letter: 'G', letterState: LetterState.Default },
    { letter: 'H', letterState: LetterState.Default },
    { letter: 'J', letterState: LetterState.Default },
    { letter: 'K', letterState: LetterState.Default },
    { letter: 'L', letterState: LetterState.Default },
  ],
  [
    { letter: 'Enter', letterState: LetterState.Default },
    { letter: 'Z', letterState: LetterState.Default },
    { letter: 'X', letterState: LetterState.Default },
    { letter: 'C', letterState: LetterState.Default },
    { letter: 'V', letterState: LetterState.Default },
    { letter: 'B', letterState: LetterState.Default },
    { letter: 'N', letterState: LetterState.Default },
    { letter: 'M', letterState: LetterState.Default },
    { letter: 'Backspace', letterState: LetterState.Default },
  ],
]

export const useGameLogicStore = defineStore('gameLogic', {
  state: () => ({
    gameState: GameState.Ready,

    solution: '',

    guesses: structuredClone(guessesDefault),
    keys: structuredClone(keysDefault),

    currentRowGuessIndex: 0,
    currentLetterGuessIndex: 0,
  }),

  getters: {
    solutionArray: (state) => state.solution.split(''),
  },

  actions: {
    startGame() {
      this.guesses = structuredClone(guessesDefault)
      this.keys = structuredClone(keysDefault)
      this.currentRowGuessIndex = 0
      this.currentLetterGuessIndex = 0
      this.gameState = GameState.Playing

      api
        .get('https://random-word-api.herokuapp.com/word?length=5')
        .then((response: AxiosResponse) => {
          this.solution = response.data[0].toUpperCase()
        })
        .catch(() => {
          this.solution = 'REACT'
        })
    },

    handleLetterInput(letter: string) {
      const currentRow = this.guesses[this.currentRowGuessIndex]
      let entered = false

      currentRow?.forEach((guess) => {
        if (guess.letter === '' && !entered) {
          guess.letter = letter
          entered = true

          if (this.currentLetterGuessIndex < 5) {
            this.currentLetterGuessIndex += 1
          }

          return
        }
      })
    },

    handleBackspace() {
      this.guesses.forEach((row, rowIndex) => {
        row.forEach((guess, letterIndex) => {
          if (
            rowIndex === this.currentRowGuessIndex &&
            letterIndex === this.currentLetterGuessIndex - 1 &&
            guess.letter !== ''
          ) {
            guess.letter = ''
            this.currentLetterGuessIndex -= 1
            return
          }
        })
      })
    },

    handleGuess() {
      const currentRow = this.guesses[this.currentRowGuessIndex]

      const isValidGuess =
        currentRow?.every((guess) => guess.letter !== '') ?? false

      if (!currentRow || !isValidGuess) return

      let stateToSet = LetterState.Default

      api
        .get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${currentRow
            .map((g) => g.letter)
            .join('')
            .toLowerCase()}`,
        )
        .then((response: AxiosResponse) => {
          if (response.status !== 200) {
            throw new Error('Not a valid word')
          }

          this.guesses[this.currentRowGuessIndex]?.forEach((guess, index) => {
            if (guess.letter === this.solutionArray[index]) {
              stateToSet = LetterState.Correct
            } else if (this.solutionArray.includes(guess.letter)) {
              stateToSet = LetterState.Present
            } else {
              stateToSet = LetterState.Absent
            }

            this.keys.forEach((row) => {
              row.forEach((key) => {
                if (key.letter === guess.letter) {
                  key.letterState = stateToSet
                }
              })
            })

            guess.letterState = stateToSet
            guess.hasGuessed = true
          })

          if (
            this.guesses[this.currentRowGuessIndex]?.every(
              (guess) => guess.letterState === LetterState.Correct,
            )
          ) {
            this.gameState = GameState.Won
            return
          }

          this.currentRowGuessIndex += 1
          this.currentLetterGuessIndex = 0

          if (this.currentRowGuessIndex === 6) {
            this.gameState = GameState.Lost
          }
        })
        .catch(() => {
          console.log('illegal word')
        })
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameLogicStore, import.meta.hot))
}
