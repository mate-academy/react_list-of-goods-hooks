import { SortType } from '../App';

export function getSortedGoods(
  initialGoods: string[],
  sortField: SortType,
  reverseField: boolean,
) {
  const preparedGoods = [...initialGoods];

  if (sortField === SortType.none && reverseField === false) {
    return initialGoods;
  }

  const sortAlphabetically = [...preparedGoods].sort((good1, good2) => {
    return good1.localeCompare(good2);
  });

  const sortByLength = [...sortAlphabetically].sort((good1, good2) => {
    return good1.length - good2.length;
  });

  if (sortField === SortType.alphabetically) {
    if (reverseField) {
      return sortAlphabetically.reverse();
    }

    return sortAlphabetically;
  }

  if (sortField === SortType.length) {
    if (reverseField) {
      return sortByLength.reverse();
    }

    return sortByLength;
  }

  if (reverseField) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}
