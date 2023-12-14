import { Party } from './party';
import { getParty } from '../types';

export interface PartyService {
  getParty(id: number): Promise<getParty>;
  getParties(): Promise<Party[]>;
  createParty(party: Party): Promise<Party>;
  updateParty(party: Party): Promise<Party>;
  deleteParty(id: number): Promise<void>;
}
