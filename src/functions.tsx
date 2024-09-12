import { Args } from './Types/Arguments';
import { SortOptions } from './Types/SortOptions';

interface FilterParams {
  sortField: SortOptions;
  isReversed: boolean;
}

export function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: FilterParams,
) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'length':
          return good1.length - good2.length;
        case 'abc':
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

function checkSortField(oldValue: SortOptions, newValue: SortOptions) {
  return oldValue === newValue ? SortOptions.empty : newValue;
}

export function onClickHandler(args: Args) {
  const { name, sortField, currentValue, sortBy, isReversed, reverse } = args;

  switch (name) {
    case 'Reverse':
      reverse(!isReversed);
      break;

    case 'Reset':
      reverse(false);
      sortBy(SortOptions.empty);
      break;

    default:
      sortBy(checkSortField(sortField, currentValue));
  }
}
