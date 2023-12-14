import { Party } from './party';
import { PartyService } from './party.service';
import { getParty } from '../types';

export class PartyController {
  constructor(private partyService: PartyService) {}

  async getParty(id: number): Promise<getParty> {
    return this.partyService.getParty(id);
  }

  async getParties(): Promise<Party[]> {
    return this.partyService.getParties();
  }

  async createParty(party: Party): Promise<Party> {
    if (party.wordToGuess == '' || party.name == '') {
      throw new Error('Fields cannot be empty');
    }

    return this.partyService.createParty(party);
  }

  async updateParty(party: Party): Promise<Party> {
    return this.partyService.updateParty(party);
  }

  async deleteParty(id: number): Promise<void> {
    return this.partyService.deleteParty(id);
  }
}
