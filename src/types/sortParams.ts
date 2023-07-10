import { SortType } from './sortTypes.enum';

export interface SortParams {
  sortType: SortType | null,
  isReversed: boolean,
}
