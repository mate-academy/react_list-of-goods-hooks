import { SortType } from './SortType';

export type SortOption = {
  sortField: SortType;
  isReversed: boolean | null;
};
