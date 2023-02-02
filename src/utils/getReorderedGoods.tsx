import { SortType } from '../types/SortType';

export const getReorderedGoods = (
  goods: string[],
  isReversed: boolean,
  sortType: SortType,
) => {
  const goodsList = [...goods];

  goodsList.sort((goodsItemA, goodsItemB) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return goodsItemA.localeCompare(goodsItemB);

      case SortType.LENGTH:
        return goodsItemA.length - goodsItemB.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    goodsList.reverse();
  }

  return goodsList;
};
