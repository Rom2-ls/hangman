export type PartyType = {
  id: number;
  name: string;
  wordToGuess: string;
  lettersUsed: string[];
  lettersGuessed: string[];
  lettersRemaining: string[];
  guessesRemaining: number;
};

export class Party {
  constructor(
    public id: number,
    public name: string,
    public wordToGuess: string,
    public lettersUsed: string[],
    public lettersGuessed: string[],
    public lettersRemaining: string[],
    public guessesRemaining: number,
  ) {}
}
