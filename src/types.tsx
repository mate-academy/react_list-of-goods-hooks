export enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

export type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};
