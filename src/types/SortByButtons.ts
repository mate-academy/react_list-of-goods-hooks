export enum EButtonsSortBy {
  Alphabet = 'Sort alphabetically',
  Length = 'Sort by length',
  Reverse = 'Reverse',
  Reset = 'Reset',
  SortByNone = '',
}

export type TButtonInfo = {
  name: EButtonsSortBy;
  ownClass: string;
};

export type TOnSortByHandler = (name: string) => void;
