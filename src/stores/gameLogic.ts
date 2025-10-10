import { defineStore, acceptHMRUpdate } from 'pinia'
import { GameState, LetterState } from '@/enums'
import wordlib from 'word-lib'
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

    DELAY_MS: 400,

    guesses: structuredClone(guessesDefault),
    keys: structuredClone(keysDefault),
    pendingKeys: structuredClone(keysDefault),

    currentRowGuessIndex: 0,
    currentLetterGuessIndex: 0,

    isGuessInvalidWord: false,
  }),

  getters: {
    solutionArray: (state) => state.solution.split(''),
  },

  actions: {
    async startGame() {
      const response = await api.get('/data/data.json')
      const wordList = response.data

      this.solution =
        wordList[Math.floor(Math.random() * wordList.length)].toUpperCase() ||
        'AUDIO'

      this.guesses = structuredClone(guessesDefault)
      this.keys = structuredClone(keysDefault)
      this.pendingKeys = structuredClone(keysDefault)
      this.currentRowGuessIndex = 0
      this.currentLetterGuessIndex = 0
      this.gameState = GameState.Playing
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

      if (
        !currentRow ||
        !isValidGuess ||
        !wordlib.exists(
          currentRow
            .map((g) => g.letter)
            .join('')
            .toLowerCase(),
        )
      ) {
        this.isGuessInvalidWord = true
        await this.delay(this.DELAY_MS)
        this.isGuessInvalidWord = false
        return
      }

      await this.evaluateGuesses()

      if (
        this.guesses[this.currentRowGuessIndex]?.every(
          (guess) => guess.letterState === LetterState.Correct,
        )
      ) {
        await this.delay(this.DELAY_MS)
        this.gameState = GameState.Won
        return
      }

      this.currentRowGuessIndex += 1
      this.currentLetterGuessIndex = 0

      if (this.currentRowGuessIndex === 6) {
        await this.delay(this.DELAY_MS)
        this.gameState = GameState.Lost
      }
    },

    async evaluateGuesses() {
      const guessArray = this.guesses[this.currentRowGuessIndex]
      const presentGuesses: string[] = []

      if (!guessArray) return

      for (let i = 0; i < guessArray.length; i++) {
        let stateToSet = LetterState.Absent
        const guess = guessArray[i]

        if (!guess) return

        const currentGuessLetterIsPresent = this.solutionArray.includes(
          guess.letter,
        )
        const currentGuessLetterIsCorrect =
          guess.letter === this.solutionArray[i]

        if (currentGuessLetterIsPresent && !currentGuessLetterIsCorrect) {
          if (
            this.solutionArray.filter((l) => l === guess.letter).length !==
            presentGuesses.filter((l) => l === guess.letter).length
          ) {
            stateToSet = LetterState.Present
            presentGuesses.push(guess.letter)
          }
        }

        if (currentGuessLetterIsCorrect) {
          presentGuesses.push(guess.letter)
          stateToSet = LetterState.Correct
        }

        await this.setLetterState(guess, stateToSet)
      }

      await this.delay(this.DELAY_MS)

      this.keys = JSON.parse(JSON.stringify(this.pendingKeys))
    },

    async setLetterState(
      guess: { letter: string; letterState: LetterState; hasGuessed: boolean },
      stateToSet: LetterState,
    ): Promise<void> {
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms))

      guess.letterState = stateToSet
      guess.hasGuessed = true

      this.pendingKeys.forEach((row) => {
        row.forEach((key) => {
          if (!guess) return

          if (
            key.letter === guess.letter &&
            key.letterState !== LetterState.Correct
          ) {
            key.letterState = stateToSet
          }
        })
      })

      await delay(this.DELAY_MS)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameLogicStore, import.meta.hot))
}
