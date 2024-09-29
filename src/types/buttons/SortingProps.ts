import { SortType } from '../../Enums/SortType';

export interface SortingProps {
  sortBy: SortType;
  setSortBy: (sortBy: SortType) => void;
}
