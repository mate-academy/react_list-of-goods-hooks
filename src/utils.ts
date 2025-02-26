import { SortParam } from './types';

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

export const sortData = (sortArray: Array<string>, sortParam: SortParam) => {
  if (sortParam === 'alphabet') {
    return sortArray.sort((a, b) => a.localeCompare(b));
  }

  if (sortParam === 'length') {
    return sortArray.sort((a, b) => a.length - b.length || a.localeCompare(b));
  }

  return goodsFromServer;
};
