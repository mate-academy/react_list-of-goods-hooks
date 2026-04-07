import { SortingType } from '../types/state';
import { Good } from '../types/Good';

import { SORTING } from './state';

export const SORT: Record<SortingType, (list: Good[]) => Good[]> = {
  [SORTING.DEFAULT]: list => [...list],
  [SORTING.ALPHABETICALLY]: list =>
    list.toSorted((el1, el2) => el1.localeCompare(el2)),
  [SORTING.BY_LENGTH]: list =>
    list.toSorted((el1, el2) => el1.length - el2.length),
};
