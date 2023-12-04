export enum SortBy {
  Default = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

export type Options = {
  sort: string,
  isReversed: boolean,
};

export type GoodsType = string[];
