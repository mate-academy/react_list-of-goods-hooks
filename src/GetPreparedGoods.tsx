import { goodsFromServer } from "./goods";
import { SortType } from "./enums";

export const getPreparedGoods = (
  sortBy: SortType,
  reversedList: boolean,
): string[] => {
  const prepared = [...goodsFromServer];

  if (sortBy === SortType.Alphabet) {
    prepared.sort((a, b) => a.localeCompare(b));
  } else if (sortBy === SortType.Length) {
    prepared.sort((a, b) => a.length - b.length);
  }

  if (reversedList) {
    prepared.reverse();
  }

  return prepared;
};
