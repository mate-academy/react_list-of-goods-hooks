import { Good } from '../Types/Good';
import { Sort } from '../Types/Sort';
import { SortTypes } from '../Types/SortTypes';

export function getPreparedGoods(
  allGoods: Good[],
  { sortField, isReversed }: Sort,
) {
  const visibleGoods = [...allGoods];

  if (sortField) {
    visibleGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortTypes.Alfabetically:
          return good1.name.localeCompare(good2.name);

        case SortTypes.ByLength:
          return good1.name.length - good2.name.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}
