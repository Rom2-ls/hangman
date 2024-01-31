import { Party } from './party';
import { PartyService } from './party.service';
import { getParty } from '../types';

export class PartyJSONService implements PartyService {
  private readonly jsonFilePath = './src/party/parties.json';
  private parties: Party[] = [];

  constructor() {
    this.readParties();
  }

  async getParty(id: number): Promise<getParty> {
    const party = this.parties.find((party) => party.id === id);
    let error = '';

    if (!party) {
      error = 'Party with id ' + id + ' not found.';
    }

    return { error, party };
  }

  async getParties(): Promise<Party[]> {
    return this.parties;
  }

  async createParty(party: Party): Promise<Party> {
    const newParty = {
      ...party,
      id: this.getNextPartyId(),
      lettersUsed: [],
      lettersGuessed: [],
      guessesRemaining: 7,
      status: 'play',
    };
    this.parties.push(newParty);
    this.writeParties();

    return newParty;
  }

  async updateParty(party: Party): Promise<Party> {
    const partyIndex = this.parties.findIndex((p) => p.id === party.id);
    if (partyIndex === -1) {
      throw new Error(`Party with id ${party.id} not found.`);
    }

    this.parties[partyIndex] = party;
    this.writeParties();

    return party;
  }

  async deleteParty(id: number): Promise<void> {
    const partyIndex = this.parties.findIndex((party) => party.id === id);
    if (partyIndex === -1) {
      throw new Error(`Party with id ${id} not found.`);
    }

    this.parties.splice(partyIndex, 1);
    this.writeParties();
  }

  private getNextPartyId(): number {
    return this.parties.length
      ? Math.max(...this.parties.map((p) => p.id)) + 1
      : 1;
  }

  private readParties(): void {
    const fs = require('fs');
    const rawData = fs.readFileSync(this.jsonFilePath, 'utf-8');
    this.parties = JSON.parse(rawData);
  }

  private writeParties(): void {
    const fs = require('fs');
    fs.writeFileSync(this.jsonFilePath, JSON.stringify(this.parties));
  }
}
