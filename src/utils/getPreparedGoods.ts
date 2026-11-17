import { SortType } from '../types/SortTypes';

export function getPreparedGoods(
  goods: string[],
  sortType: SortType,
  reverse: boolean,
): string[] {
  const preparedGoods = [...goods];

  switch (sortType) {
    case SortType.Alphabet:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.Length:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}
