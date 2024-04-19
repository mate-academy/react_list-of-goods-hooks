import { goodsFromServer } from '../data';
import { Good } from '../types/Goods';
import { SortType } from '../types/SortMethods';

type SortGoods = (
  goods: Good[],
  sortMethod: SortType,
  reverse: boolean,
) => Good[];

export const sortGoods: SortGoods = (goods, sortMethod, reverse) => {
  let result = [...goods];

  const direction = reverse ? 1 : -1;

  switch (sortMethod) {
    case SortType.All: {
      if (reverse) {
        result.reverse();
      } else {
        result = goodsFromServer;
      }

      break;
    }

    case SortType.Alpha: {
      result = result.sort((a, b) => b.name.localeCompare(a.name) * direction);

      break;
    }

    case SortType.Length: {
      result.sort(
        (a, b) =>
          (b.name.length - a.name.length || b.name.localeCompare(a.name)) *
          direction,
      );

      break;
    }

    default: {
      break;
    }
  }

  return result;
};
