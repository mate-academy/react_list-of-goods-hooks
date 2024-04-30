import { SortTypes } from '../types/SortTypes';

export function getPreparedGoods(
  goods: string[],
  sortField: SortTypes,
  reverseMethod: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortTypes.LENGTH:
          return good1[sortField] - good2[sortField];
        case SortTypes.ALPHABETICALLY:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (reverseMethod) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}
