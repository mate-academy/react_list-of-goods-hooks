import { SortType } from "./enums";

export const useGoodsSort = (
  goods: string[],
  sortBy: SortType,
  reversed: boolean,
) => {
  const preparedGoods = [...goods];

  if (sortBy === SortType.Alphabet) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortBy === SortType.Length) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};
