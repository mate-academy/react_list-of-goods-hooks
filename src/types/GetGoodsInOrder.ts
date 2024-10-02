import { SortType } from './SortType';

export type GoodsInOrder = (
  goods: string[],
  SortBy: SortType,
  isReversed: boolean,
) => string[];
