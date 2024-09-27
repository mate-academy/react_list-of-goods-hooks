import { Good } from '../types/Good';
import { Sort } from '../types/Sort';
import { SortField } from '../types/SortField';

export function getPreparedGood(
  allGoods: Good[],
  { sortField, isReversed }: Sort,
): Good[] {
  const visibleGoods = [...allGoods];

  if (sortField) {
    visibleGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.ALPHABETIC:
          return good1.name.localeCompare(good2.name);

        case SortField.BYLENGTH:
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
