import { SortType } from './enums/sortType';

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((g1, g2) => {
        return g1.localeCompare(g2);
      });
      break;
    case SortType.LENGTH:
      visibleGoods.sort((g1, g2) => {
        return g1.length - g2.length;
      });
      break;
    default:
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}
