export enum SortType {
  ALPHABETICAL = 'A',
  LENGTH = 'L',
  DEFAULT = '',
}

export function getPreparedGoods(
  goods: string[],
  isSorted: string,
  isReversed: boolean,
): string[] {
  const preparedGoods = [...goods];

  switch (isSorted) {
    case SortType.ALPHABETICAL:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SortType.LENGTH:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:

      break;
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}
