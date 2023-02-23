import { SortType } from '../types/sort-types';

export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((prev, next) => {
    switch (sortType) {
      case SortType.LENGTH:
        return prev.length - next.length;
      case SortType.ALPHABET:
        return prev.localeCompare(next);

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}
