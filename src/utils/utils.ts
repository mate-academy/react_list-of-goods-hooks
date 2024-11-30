import { SortType } from '../types/types';

export function getPreparedGoods(
  goods: string[],
  sortBy: SortType,
  isReversed: boolean,
) {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy as SortType) {
        case SortType.BY_ALPHA:
          return good1.localeCompare(good2);

        case SortType.BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}
