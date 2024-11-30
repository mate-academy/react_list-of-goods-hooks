import { SortOption, SortType } from '../types/Sort';

export const sortOptions: SortOption[] = [
  {
    id: 1,
    type: SortType.ASC,
    title: 'Sort alphabetically',
    cssClass: 'is-info',
  },
  {
    id: 2,
    type: SortType.LENGTH,
    title: 'Sort by length',
    cssClass: 'is-success',
  },
];
