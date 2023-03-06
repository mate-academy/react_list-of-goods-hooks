import { SortType } from '../types/SortType';

export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
): string[] {
  const visibleGoods = [...goods];

  if (sortType) {
    visibleGoods.sort((prev, next) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return prev.localeCompare(next);

        case SortType.LENGTH:
          return prev.length - next.length;

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
