import { SortType } from '../../types/SortType';
import { SortTypeFunctionProps } from '../../types/SortTypeFunction';

export const sortTypeFunction = ({
  goods,
  sortType,
  reverse,
}: SortTypeFunctionProps): Array<string> => {
  const sortedGoods = [...goods].sort((itemOne: string, itemTwo: string) => {
    if (sortType === SortType.alphabetically) {
      return itemOne.localeCompare(itemTwo);
    }

    if (sortType === SortType.length) {
      return itemOne.length - itemTwo.length;
    }

    return 0;
  });

  return reverse ? sortedGoods.reverse() : sortedGoods;
};
