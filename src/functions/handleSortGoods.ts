import { Goods } from '../types/Goods';
import { SortType } from '../types/SortType';

export const handleSortGoods = (
  goodsList: Goods,
  sortByField: SortType,
): Goods => {
  const filteredGoods = [...goodsList];

  if (sortByField) {
    switch (sortByField) {
      case SortType.LENGTH:
        return filteredGoods.sort(
          (good1, good2) => good1.length - good2.length,
        );

      case SortType.ALPHABET:
        return filteredGoods.sort((good1, good2) => good1.localeCompare(good2));
    }
  }

  return filteredGoods;
};
