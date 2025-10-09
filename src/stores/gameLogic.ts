import { defineStore, acceptHMRUpdate } from 'pinia'
import { GameState, LetterState } from '@/enums'
import wordlib from 'word-lib'

/**
 * TODO:
  - multiple of the same letter, but only one in solution, show single orange letter only
 */

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

    solution: 'DWAAL',

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
      // this.solution = wordlib
      //   .random({ minLength: 5, maxLength: 5 })
      //   .toUpperCase()
      this.guesses = structuredClone(guessesDefault)
      this.keys = structuredClone(keysDefault)
      this.currentRowGuessIndex = 0
      this.currentLetterGuessIndex = 0
      this.gameState = GameState.Playing

      console.log(this.solution)
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

    delay(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },

    async handleGuess() {
      const currentRow = this.guesses[this.currentRowGuessIndex]

      const isValidGuess =
        currentRow?.every((guess) => guess.letter !== '') ?? false

      if (!currentRow || !isValidGuess) return

      if (
        wordlib.exists(
          currentRow
            .map((g) => g.letter)
            .join('')
            .toLowerCase(),
        )
      ) {
        await this.evaluateGuesses()

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
      }
    },

    async evaluateGuesses() {
      // TODO: refactor to reduce complexity
      let stateToSet = LetterState.Default
      const duplicatePresentLetterGuesses: string[] = []

      const currentGuesses = this.guesses[this.currentRowGuessIndex]
      if (!currentGuesses) return

      for (let index = 0; index < currentGuesses.length; index++) {
        const guess = currentGuesses[index]

        if (guess && guess.letter === this.solutionArray[index]) {
          stateToSet = LetterState.Correct
          duplicatePresentLetterGuesses.push(guess.letter)
        } else if (guess && this.solutionArray.includes(guess.letter)) {
          if (this.solutionArray.filter((l) => l === guess.letter).length > 1) {
            stateToSet = LetterState.Present
          } else {
            stateToSet = duplicatePresentLetterGuesses.includes(guess.letter)
              ? LetterState.Absent
              : this.solutionArray.includes(guess.letter)
                ? LetterState.Absent
                : LetterState.Present
            duplicatePresentLetterGuesses.push(guess.letter)
          }
        } else {
          stateToSet = LetterState.Absent
        }

        if (guess) {
          await this.setLetterState(guess, stateToSet)
        }
      }
    },

    async setLetterState(
      guess: { letter: string; letterState: LetterState; hasGuessed: boolean },
      stateToSet: LetterState,
    ): Promise<void> {
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms))

      guess.letterState = stateToSet
      guess.hasGuessed = true

      this.keys.forEach((row) => {
        row.forEach((key) => {
          // TODO: fix issue with states not taking president - refactor needed
          if (guess && key.letter === guess.letter) {
            if (key.letterState === LetterState.Default) {
              key.letterState = stateToSet
            } else {
              if (key.letterState === LetterState.Correct) {
                key.letterState = stateToSet
              } else if (key.letterState === LetterState.Present) {
                key.letterState =
                  stateToSet === LetterState.Correct
                    ? stateToSet
                    : key.letterState
              } else {
                key.letterState = stateToSet
              }
            }
          }
        })
      })

      await delay(300)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameLogicStore, import.meta.hot))
}
