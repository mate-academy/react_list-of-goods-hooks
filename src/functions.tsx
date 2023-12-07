import { ReorderOptions, SortType } from './types';

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];
  const { NONE, ALPHABET, LENGTH } = SortType;

  switch (sortType) {
    case NONE:
      break;
    case ALPHABET:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case LENGTH:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}
