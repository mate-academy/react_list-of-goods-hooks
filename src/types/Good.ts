export type Good = string;

export enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
  Default = '',
}

export interface SortBy {
  method: SortType,
  isReversedOrder: boolean,
}
