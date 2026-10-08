import { SortType } from './types';

type SortOptions = {
  byAlphabet: SortType;
  byLength: SortType;
  reverse: SortType;
};

export const sortByParam = (
  goods: string[],
  options: SortOptions,
): string[] => {
  let arrayResult = [...goods];

  if (options.byAlphabet === SortType.Alphabet) {
    arrayResult = [...goods].sort((a, b) => a.localeCompare(b));
  }

  if (options.byLength === SortType.Length) {
    arrayResult = [...goods].sort((a, b) => a.length - b.length);
  }

  if (options.reverse === SortType.Reverse) {
    arrayResult.reverse();
  }

  return arrayResult;
};
