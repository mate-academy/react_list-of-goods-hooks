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

export const renderList = (goods: string[]) => (
  goods.map(goodItem => (
    <li key={goodItem}>
      {
        goodItem
      }
    </li>
  )));

export const filterGoodsByLength = (itemLength: number) => (
  goodsFromServer.filter(goodItem => (
    goodItem.length >= itemLength
  )));
