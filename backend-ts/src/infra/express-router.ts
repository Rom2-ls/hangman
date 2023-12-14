import { Router } from 'express';

import { PartyController } from '../party/party.controller';
import { PartyRouter } from '../party/party.router';
import { PartyService } from '../party/party.service';

import { WordController } from '../word/word.controller';
import { WordRouter } from '../word/word.router';
import { WordService } from '../word/word.service';

export class ExpressRouter {
  router = Router();

  private partyController!: PartyController;
  private wordController!: WordController;

  private partyRouter!: PartyRouter;
  private wordRouter!: WordRouter;

  constructor(
    private partyService: PartyService,
    private wordService: WordService,
  ) {
    this.configureControllers();
    this.configureRouters();
    this.configureRoutes();
  }

  private configureControllers(): void {
    this.partyController = new PartyController(this.partyService);
    this.wordController = new WordController(this.wordService);
  }

  private configureRouters(): void {
    this.partyRouter = new PartyRouter(this.partyController);
    this.wordRouter = new WordRouter(this.wordController);
  }

  private configureRoutes(): void {
    this.router.use('/parties', this.partyRouter.router);
    this.router.use('/words', this.wordRouter.router);
  }
}
