export type Good = string;

export enum SortType {
  byLength = 'length',
  byName = 'name',
  reverse = 'reverse',
  reset = 'reset',
}

export type SortParam = SortType.byLength
| SortType.byName
| SortType.reset
| '';

export type ReverseParam = SortType.reverse | '';

export type SortingParams = {
  sortBy: SortParam;
  order?: ReverseParam;
};
