export enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

export interface ReorderOptions {
  sortType: SortType,
  isReversed: boolean,
}
