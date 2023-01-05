import ReorderOptions from '../types/ReorderOptions';
import SortType from '../types/SortType';

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  if (sortType !== SortType.NONE) {
    visibleGoods.sort((itemA, itemB) => {
      return sortType === SortType.ALPHABET
        ? itemA.localeCompare(itemB)
        : itemA.length - itemB.length;
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export {};
