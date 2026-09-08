export enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
}

export const getSortedGoods = (
  goods: string[],
  sortBy: SortType | null,
  reversed: boolean,
) => {
  const sortedGoods = [...goods];

  switch (sortBy) {
    case SortType.Alphabet:
      sortedGoods.sort((word1, word2) => word1.localeCompare(word2));
      break;

    case SortType.Length:
      sortedGoods.sort((word1, word2) => word1.length - word2.length);
      break;

    default:
      break;
  }

  if (reversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};
