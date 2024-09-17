export const goodsFromServer: string[] = [
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
  SORT_ALPHABET = 'alphabet',
  SORT_LENGTH = 'length',
}

type Goods = (goods: string[], filter: string, reversed: boolean) => string[];

export const filteredGoods: Goods = (goods, filter, reversed) => {
  let result = [...goods];

  if (filter === SortType.SORT_ALPHABET) {
    result.sort((a, b) => a.localeCompare(b));
  }

  if (filter === SortType.SORT_LENGTH) {
    result.sort((a, b) => a.length - b.length);
  }

  if (reversed === true) {
    result = result.reverse();
  }

  return result;
};
