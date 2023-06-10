import { ReorderOptions } from '../Types/ReorderOptions';
import { SortType } from '../Types/SortType';

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  if (sortType === SortType.NONE) {
    return isReversed
      ? [...goods].reverse()
      : goods;
  }

  const visibleGoods = [...goods]
    .sort((a, b) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return a.localeCompare(b);
        case SortType.LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
}
