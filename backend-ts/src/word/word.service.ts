import { Word } from './word';
import { getWord } from '../types';

export interface WordService {
  getWord(id: number): Promise<getWord>;
  getRandomWord(): Promise<Word>;
  getWords(): Promise<Word[]>;
  createWord(word: Word): Promise<Word>;
  updateWord(word: Word): Promise<Word>;
  deleteWord(id: number): Promise<void>;
}
