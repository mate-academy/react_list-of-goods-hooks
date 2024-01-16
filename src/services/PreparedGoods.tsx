import { SortType } from '../types/SortType';

export function getPreparedGoods(
  goods: string[],
  howSort: SortType,
  reverse = false,
) {
  const preparedGoods = [...goods];

  if (howSort) {
    preparedGoods.sort((good1, good2) => {
      switch (howSort) {
        case SortType.name:
          return good1.localeCompare(good2);

        case SortType.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}
