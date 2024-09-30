import { SortType } from '../models/enum/enums';
import { FilterParams } from '../models/interfaces';

export function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: FilterParams,
) {
  const copiedGoods = [...goods];

  if (sortField) {
    copiedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.BY_ALPHABET:
          return good1.localeCompare(good2);

        case SortType.BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return copiedGoods.reverse();
  }

  return copiedGoods;
}
