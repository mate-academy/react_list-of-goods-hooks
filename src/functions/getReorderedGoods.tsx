import { ReorderOptions } from '../types/ReorderOptions';
import { SortType } from '../enums/SortType';

export const getReorderedGoods = (
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) => {
  const visibleGoods = [...goods];

  if (sortType !== SortType.NONE) {
    visibleGoods.sort((firstGood, secondGood) => {
      switch (sortType) {
        case SortType.LENGTH:
          return firstGood.length - secondGood.length;

        case SortType.ALPHABET:
          return firstGood.localeCompare(secondGood);

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
};
