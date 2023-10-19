const goodsFromServer: string[] = [
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
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  DEFAULT = '',
}

export const sortGoods = (sortField: SortType, reverse: boolean): string[] => {
  const preparedGoods: string[] = [...goodsFromServer];

  switch (sortField) {
    case SortType.ALPHABET:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};
