import { SortOptions } from './Types/SortOptions';

interface FilterParams {
  sortField: SortOptions;
  reverseStatus: string;
}

export function getPreparedGoods(
  goods: string[],
  { sortField, reverseStatus }: FilterParams,
) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'length':
          return good1.length - good2.length;
        case 'abc':
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (reverseStatus) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}
