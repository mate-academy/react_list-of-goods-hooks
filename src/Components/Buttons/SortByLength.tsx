import { SortingProps } from '../../types/buttons/SortingProps';
import { SortType } from '../../Enums/SortType';
import cn from 'classnames';
import React from 'react';

export const SortByLength: React.FC<SortingProps> = ({ sortBy, setSortBy }) => {
  return (
    <button
      type="button"
      className={cn('button is-success', {
        'is-light': sortBy !== SortType.LENGTH,
      })}
      onClick={() => setSortBy(SortType.LENGTH)}
    >
      Sort by length
    </button>
  );
};
