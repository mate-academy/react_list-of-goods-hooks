import { SortTypes } from './types/SortType';

export function sortList(prepearedListOfGoods: string[], sortType: SortTypes) {
  prepearedListOfGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortTypes.length:
        return good1.length - good2.length;
      case SortTypes.alph:
        return good1.localeCompare(good2);
      default:
        return 0;
    }
  });
}
