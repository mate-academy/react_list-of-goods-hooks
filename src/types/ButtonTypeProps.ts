import { SortType } from './SortType';

export type ButtonTypeProps = {
  reverse: boolean;
  sortType: SortType;

  setSortType: (sortType: SortType) => void;
  setReverse: (reverse: boolean) => void;
};
