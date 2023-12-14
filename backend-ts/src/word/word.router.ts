import { Router } from 'express';
import { WordController } from './word.controller';

export class WordRouter {
  router = Router();

  constructor(private wordController: WordController) {
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get('/random', async (req, res) => {
      const word = await this.wordController.getRandomWord();
      res.json(word);
    });

    this.router.get('/:id', async (req, res) => {
      const id = parseInt(req.params.id);
      const word = await this.wordController.getWord(id);
      res.json(word);
    });

    this.router.get('/', async (req, res) => {
      const words = await this.wordController.getWords();
      res.json(words);
    });

    this.router.post('/', async (req, res) => {
      const word = req.body;
      const createdWord = await this.wordController.createWord(word);
      res.json(createdWord);
    });

    this.router.put('/', async (req, res) => {
      const word = req.body;
      const updatedWord = await this.wordController.updateWord(word);
      res.json(updatedWord);
    });

    this.router.delete('/:id', async (req, res) => {
      const id = parseInt(req.params.id);
      await this.wordController.deleteWord(id);
      res.json();
    });
  }
}
