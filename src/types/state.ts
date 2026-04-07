import { SORTING } from '../state/state';

export type SortingType = (typeof SORTING)[keyof typeof SORTING];
