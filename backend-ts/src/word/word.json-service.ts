import { Word } from './word';
import { getWord } from '../types';
import { WordService } from './word.service';

export class WordJSONService implements WordService {
  private readonly jsonFilePath = './src/word/words.json';
  private words: Word[] = [];

  constructor() {
    this.readWords();
  }

  async getWord(id: number): Promise<getWord> {
    const word = this.words.find((word) => word.id === id);
    let error = '';

    if (!word) {
      error = 'Word with id ' + id + ' not found.';
    }

    return { error, word };
  }

  async getRandomWord(): Promise<Word> {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }

  async getWords(): Promise<Word[]> {
    return this.words;
  }

  async createWord(word: Word): Promise<Word> {
    const newWord = { ...word, id: this.getNextWordId() };
    this.words.push(newWord);
    this.writeWords();

    return newWord;
  }

  async updateWord(word: Word): Promise<Word> {
    const wordIndex = this.words.findIndex((w) => w.id === word.id);
    if (wordIndex === -1) {
      throw new Error(`Word with id ${word.id} not found.`);
    }

    this.words[wordIndex] = word;
    this.writeWords();

    return word;
  }

  async deleteWord(id: number): Promise<void> {
    const wordIndex = this.words.findIndex((word) => word.id === id);
    if (wordIndex === -1) {
      throw new Error(`Word with id ${id} not found.`);
    }

    this.words.splice(wordIndex, 1);
    this.writeWords();
  }

  private getNextWordId(): number {
    return this.words.length ? Math.max(...this.words.map((w) => w.id)) + 1 : 1;
  }

  private readWords(): void {
    const fs = require('fs');
    const rawData = fs.readFileSync(this.jsonFilePath);
    this.words = JSON.parse(rawData);
  }

  private writeWords(): void {
    const fs = require('fs');
    fs.writeFileSync(this.jsonFilePath, JSON.stringify(this.words));
  }
}
