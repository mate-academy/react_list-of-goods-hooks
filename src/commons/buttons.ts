import { ButtonTypeProps } from '../types/ButtonTypeProps';
import { SortType } from '../types/SortType';

export const buttons = ({
  sortType,
  reverse,
  setSortType,
  setReverse,
}: ButtonTypeProps) => [
  {
    text: 'Sort alphabetically',
    style: 'is-info',
    variant: sortType !== SortType.alphabetically && 'is-light',
    onClick: () => setSortType(SortType.alphabetically),
  },
  {
    text: 'Sort length',
    style: 'is-success',
    variant: sortType !== SortType.length && 'is-light',
    onClick: () => setSortType(SortType.length),
  },
  {
    text: 'Reverse',
    style: 'is-warning',
    variant: !reverse && 'is-light',
    onClick: () => setReverse(!reverse),
  },
  {
    text: 'Reset',
    style: 'is-danger',
    variant: sortType !== SortType.default || reverse,
    onClick: () => {
      setSortType(SortType.default);
      setReverse(false);
    },
  },
];
