import { SortType } from '../types/SortType';

interface FilterParams {
  sortField: SortType | '';
  isReversed: boolean;
}

export const getPreparedGoods = (
  goods: string[],
  { sortField, isReversed }: FilterParams,
) => {
  const preparedGoods = [...goods];

  if (sortField !== '') {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Length:
          return good1.length - good2.length;

        case SortType.Alphabet:
          return good1.localeCompare(good2);

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
