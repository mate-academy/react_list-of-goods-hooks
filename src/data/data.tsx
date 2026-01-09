import { SortType } from '../types/SortType';
import { ClassNameButton } from '../types/ClassNameButton';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const buttonClassesFields: [ClassNameButton, SortType][] = [
  [ClassNameButton.Info, SortType.SortAlphabetically],
  [ClassNameButton.Success, SortType.SortByLength],
  [ClassNameButton.Warning, SortType.Reverse],
  [ClassNameButton.Danger, SortType.Reset],
];
