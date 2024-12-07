import { SortType } from '../enums/SortType';

export const getVisibleGoods = (
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
): string[] => {
  const sortedGoods: string[] = [...goods];

  switch (sortType) {
    case SortType.Alphabetic:
      sortedGoods.sort((a: string, b: string): number => a.localeCompare(b));
      break;

    case SortType.Length:
      sortedGoods.sort((a: string, b: string): number => a.length - b.length);
      break;
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};
