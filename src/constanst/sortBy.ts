import { SortType } from '../types/SortType';

interface SortBy {
  [key: string]: SortType;
}

export const SORT_BY: SortBy = {
  ALPHABET: SortType.alphabet,
  LENGTH: SortType.length,
  REVERSE: SortType.reverse,
  RESET: SortType.reset,
  INITIAL: SortType.initial,
};
