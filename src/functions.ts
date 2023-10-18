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

export const sortData = (sortField: SortType, reverse: boolean): string[] => {
  const data: string[] = [...goodsFromServer];

  switch (sortField) {
    case SortType.ALPHABET:
      data.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      data.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (reverse) {
    data.reverse();
  }

  return data;
};
