import { SortType, ReorderOptions } from '../App/typedefs';

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((current, next) => {
    switch (sortType) {
      case SortType.LENGTH:
        return current.length - next.length;

      case SortType.ALPHABET:
        return current.localeCompare(next);

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}
