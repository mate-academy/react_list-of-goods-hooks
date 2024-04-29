import { SortType, SortedGoods } from '../../App';

export const getSortedGoods = (
  goods: string[],
  { sortField, goodsReverse }: SortedGoods,) => {
  let prepearedGoods: string[] = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.sortAlphabet:
          return good1.localeCompare(good2);
        case SortType.sortLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (goodsReverse) {
    prepearedGoods = prepearedGoods.reverse();
  }

  return prepearedGoods;
};
