import { SortType } from './SortType';
import { Good } from './Good';

export type PreparedGoods = (
  goods: Good[],
  sortField: SortType,
  isReversedActive: boolean,
) => Good[];
