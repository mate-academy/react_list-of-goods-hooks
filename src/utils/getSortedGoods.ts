import { SortType } from '../types/SortType';

interface SortingFilters {
  sortField: SortType;
  isReversed: boolean;
}

export function getSortedGoods(
  goods: string[],
  { sortField, isReversed }: SortingFilters,
) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods = preparedGoods.sort(
      (currentGood: string, nextGood: string) => {
        switch (sortField) {
          case SortType.ALPHABETICALLY:
            return currentGood.localeCompare(nextGood);

          case SortType.LENGTH:
            return currentGood.length - nextGood.length;

          default:
            return 0;
        }
      },
    );
  }

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}
