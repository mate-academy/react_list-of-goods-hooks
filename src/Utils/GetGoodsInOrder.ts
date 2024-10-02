import { GoodsInOrder as GetGoodsInOrder } from '../types/GetGoodsInOrder';
import { SortType } from '../types/SortType';

export const getGoodsInOrder: GetGoodsInOrder = (goods, sortBy, isReversed) => {
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
