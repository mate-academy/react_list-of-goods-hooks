import { SortType } from '../types/SortType';

export const getReorderedGoods = (
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) => {
  const reorderedGoods = [...goods];

  if (sortType) {
    reorderedGoods.sort((a, b) => {
      switch (sortType) {
        case SortType.LENGTH:
          return (a.length - b.length);

        case SortType.ALPHABET:
          return a.localeCompare(b);

        default:
          throw new Error('Invalid SortType');
      }
    });
  }

  if (isReversed) {
    reorderedGoods.reverse();
  }

  return reorderedGoods;
};
