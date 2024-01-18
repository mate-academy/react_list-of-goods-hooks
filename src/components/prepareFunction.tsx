import { SortString } from '../variables';

export function getPreparedGoods(
  goods: string[],
  sortField: string,
  isReverse: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortString.Alphabet:
          return good1.localeCompare(good2);

        case SortString.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}
