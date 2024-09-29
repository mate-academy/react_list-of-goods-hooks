import { GoodsInOrder } from '../types/GoodsInOrder';
import { SortType } from '../Enums/SortType';

export const getGoodsInOrder: GoodsInOrder = (goods, sortBy, isReversed) => {
  const sortedGoods = [...goods];

  if (sortBy !== SortType.INITIAL) {
    sortedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;
      }
    });
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};
