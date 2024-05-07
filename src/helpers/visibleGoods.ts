import { SortType } from '../types/SortTypes';
type VisibleGoods = (
  reverse: boolean,
  sortBy: number,
  goodsFromServer: string[],
) => string[];

export const visibleGoods: VisibleGoods = function (
  reverse,
  sortBy,
  goodsFromServer,
): string[] {
  if (reverse && sortBy === SortType.none) {
    return [...goodsFromServer].reverse();
  }

  return [...goodsFromServer].sort((good1, good2) => {
    let result = 0;

    if (sortBy === SortType.alphabetically) {
      result = good1.localeCompare(good2);
    }

    if (sortBy === SortType.length) {
      result = good1.length - good2.length || good1.localeCompare(good2);
    }

    if (reverse) {
      return result * -1;
    }

    return result;
  });
};
