export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export enum SortType {
  None,
  Alphabetical,
  Length,
}

export const sortAlphabetically = (goods: string[]): string[] =>
  [...goods].sort((a, b) => a.localeCompare(b));

export const sortByLength = (goods: string[]): string[] =>
  [...goods].sort((a, b) => a.length - b.length);

export const reverseOrder = (goods: string[]): string[] => [...goods].reverse();

export const getVisibleGoods = (goods: string[], sortType: SortType, isReversed: boolean): string[] => {
  let visibleGoods: string[] = [...goods];

  if (sortType === SortType.Alphabetical) {
    visibleGoods = sortAlphabetically(visibleGoods);
  } else if (sortType === SortType.Length) {
    visibleGoods = sortByLength(visibleGoods);
  }

  if (isReversed) {
    visibleGoods = reverseOrder(visibleGoods);
  }

  return visibleGoods;
};
