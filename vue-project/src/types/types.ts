export type PartyType = {
  id: number
  name: string
  wordToGuess: string
  lettersUsed: string[]
  lettersGuessed: string[]
  lettersRemaining: string[]
  guessesRemaining: number
  status: string
}
