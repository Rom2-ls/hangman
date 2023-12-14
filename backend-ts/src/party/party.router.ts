import { Router } from 'express';
import { PartyController } from './party.controller';

export class PartyRouter {
  router = Router();

  constructor(private partyController: PartyController) {
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get('/:id', async (req, res) => {
      const id = parseInt(req.params.id);
      const party = await this.partyController.getParty(id);
      res.json(party);
    });

    this.router.get('/', async (req, res) => {
      const parties = await this.partyController.getParties();
      res.json(parties);
    });

    this.router.post('/', async (req, res) => {
      const party = req.body;
      const createdParty = await this.partyController.createParty(party);
      res.json(createdParty);
    });

    this.router.put('/', async (req, res) => {
      const party = req.body;
      const updatedParty = await this.partyController.updateParty(party);
      res.json(updatedParty);
    });

    this.router.delete('/:id', async (req, res) => {
      const id = parseInt(req.params.id);
      await this.partyController.deleteParty(id);
      res.json();
    });
  }
}
