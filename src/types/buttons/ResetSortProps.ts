import { SortType } from '../../Enums/SortType';

export interface ResetSortProps {
  setSortBy: (reset: SortType) => void;
  setIsReversed: (reset: boolean) => void;
}
