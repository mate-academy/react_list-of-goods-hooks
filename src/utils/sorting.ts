export enum SortType {
  None = 'none',
  Alphabetically = 'alphabetically',
  ByLength = 'byLength',
}

export function getSortedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
): string[] {
  const sortedGoods = [...goods];

  switch (sortType) {
    case SortType.Alphabetically:
      sortedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.ByLength:
      sortedGoods.sort((a, b) => a.length - b.length);
      break;
  }

  return isReversed ? sortedGoods.reverse() : sortedGoods;
}
