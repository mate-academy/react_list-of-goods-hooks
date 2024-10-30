import { SortType } from '../enums/sortType';
import { TGoods } from '../types/goodsTypes';

interface ISortGoods {
  (goods: TGoods, sortType: SortType, isReverse: boolean): TGoods;
}

const sortGoods: ISortGoods = (goods, sortType, isReverse = false) => {
  if (!sortType && isReverse) {
    return [...goods].reverse();
  }

  const sortedGoods = [...goods].sort((a, b) => {
    switch (sortType) {
      case SortType.SORT_BY_CHAR:
        return isReverse ? b.localeCompare(a) : a.localeCompare(b);

      case SortType.SORT_BY_LENGTH:
        return a.length - b.length;

      default:
        return 0;
    }
  });

  return isReverse && sortType === SortType.SORT_BY_LENGTH
    ? sortedGoods.reverse()
    : sortedGoods;
};

export default sortGoods;
