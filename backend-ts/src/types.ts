import { Party } from './party/party';
import { Word } from './word/word';

export type getParty = {
  error: string;
  party: Party | undefined;
};

export type getWord = {
  error: string;
  word: Word | undefined;
};
