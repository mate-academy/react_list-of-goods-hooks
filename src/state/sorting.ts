import { StateValue } from '../types/state';
import { Good } from '../types/Good';

import { STATES } from './state';

export const SORT: Record<StateValue, (list: Good[]) => Good[]> = {
  [STATES.DEFAULT]: list => [...list],
  [STATES.ALPHABETICALLY]: list =>
    list.toSorted((el1, el2) => el1.localeCompare(el2)),
  [STATES.BY_LENGTH]: list =>
    list.toSorted((el1, el2) => el1.length - el2.length),
};
