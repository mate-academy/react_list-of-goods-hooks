import { Params } from '../Types/Params';
import { SortType } from '../Types/SortType';

export function getPreparedGoods(
  goods: string[],
  { sortField, reverse }: Params,
) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SortType.SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse !== false) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}
