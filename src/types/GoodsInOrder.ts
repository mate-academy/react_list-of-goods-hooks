import { SortType } from '../Enums/SortType';

export type GoodsInOrder = (
  goods: string[],
  SortBy: SortType,
  isReversed: boolean,
) => string[];
