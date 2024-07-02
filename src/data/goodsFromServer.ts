import { Product } from '../types/Product';

const goods: string[] = [
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

export const goodsFromServer: Product[] = goods.map((el, idx) => ({
  id: idx,
  title: el,
}));
