import { SortType } from '../types/SortType';

export function prepareGoods(
  goods: string[],
  condition: SortType,
  reversed: boolean,
) {
  const preparedGoods = [...goods];

  if (condition === SortType.ALPHABET) {
    preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (condition === SortType.LENGTH) {
    preparedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}
