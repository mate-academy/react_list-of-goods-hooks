import { SortMethod } from '../types/common';

interface GetPreparedGoodsOptions {
  sort?: SortMethod | null;
  reversed?: boolean | null;
}

export const getSortedGoods = (goods: string[], sort: SortMethod) => {
  const sortedGoods = goods.sort((good1, good2) => {
    switch (sort) {
      case SortMethod.ALPHABETICALLY:
        return good1.localeCompare(good2);

      case SortMethod.LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  return sortedGoods;
};

export const getPreparedGoods = (
  goods: string[],
  { sort, reversed }: GetPreparedGoodsOptions,
) => {
  let preparedGoods = [...goods];

  if (sort) {
    preparedGoods = getSortedGoods(preparedGoods, sort);
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};
