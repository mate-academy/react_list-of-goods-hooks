import { SortOptions } from './types';

export const sortByParam = (
  goods: string[],
  options: SortOptions,
): string[] => {
  let arrayResult = [...goods];

  if (options.byAlphabet === 'active') {
    arrayResult = [...goods].sort((a, b) => a.localeCompare(b));
  }

  if (options.byLength === 'active') {
    arrayResult = [...goods].sort((a, b) => a.length - b.length);
  }

  if (options.reverse === 'active') {
    arrayResult.reverse();
  }

  return arrayResult;
};
