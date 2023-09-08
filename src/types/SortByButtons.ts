export enum ESortButtons {
  Alphabet = 'Sort alphabetically',
  Length = 'Sort by length',
  Reverse = 'Reverse',
  Reset = 'Reset',
  SortByNone = '',
}

export type TButtonInfo = {
  name: ESortButtons;
  ownClass: string;
};

export type TSortHandler = (name: string) => void;
