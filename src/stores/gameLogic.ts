import { defineStore, acceptHMRUpdate } from 'pinia'
import { LetterState } from '@/enums'

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

export const useGameLogicStore = defineStore('gameLogic', {
  state: () => ({
    solution: 'REACT',

    guesses: structuredClone(guessesDefault),

    keys: [
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
    ],

    currentRowGuessIndex: 0,
    currentLetterGuessIndex: 0,
  }),

  getters: {
    solutionArray: (state) => state.solution.split(''),
  },

  actions: {
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
      const rowGuesses: string[] = []

      this.guesses[this.currentRowGuessIndex]?.forEach((guess, index) => {
        rowGuesses.push(guess.letter)

        if (guess.letter === this.solutionArray[index]) {
          stateToSet = LetterState.Correct
        } else if (this.solutionArray.includes(guess.letter)) {
          stateToSet = LetterState.Present
        } else {
          stateToSet = LetterState.Absent
        }

        guess.letterState = stateToSet
        guess.hasGuessed = true
      })

      this.keys.forEach((row) => {
        row.forEach((key) => {
          const letterInRow = rowGuesses.includes(key.letter)

          if (letterInRow) {
            if (stateToSet === LetterState.Correct) {
              key.letterState = LetterState.Correct
            } else if (stateToSet === LetterState.Present) {
              key.letterState = LetterState.Present
            } else if (stateToSet === LetterState.Absent) {
              key.letterState = LetterState.Absent
            }
          }
        })
      })

      this.currentRowGuessIndex += 1
      this.currentLetterGuessIndex = 0
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameLogicStore, import.meta.hot))
}
