import { SortType } from '../../variables/variables';

export const getPreparedGoods = (
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
): string[] => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_BY_ALPHABET:
          return good1.localeCompare(good2);
        case SortType.SORT_BY_LENGTH:
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
};
