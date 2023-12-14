import { Word } from './word';
import { getWord } from '../types';
import { WordService } from './word.service';

export class WordController {
  constructor(private wordService: WordService) {}

  async getWord(id: number): Promise<getWord> {
    return this.wordService.getWord(id);
  }

  async getRandomWord(): Promise<Word> {
    return this.wordService.getRandomWord();
  }

  async getWords(): Promise<Word[]> {
    return this.wordService.getWords();
  }

  async createWord(word: Word): Promise<Word> {
    return this.wordService.createWord(word);
  }

  async updateWord(word: Word): Promise<Word> {
    return this.wordService.updateWord(word);
  }

  async deleteWord(id: number): Promise<void> {
    return this.wordService.deleteWord(id);
  }
}
