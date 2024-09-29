import React from 'react';
import { SortType } from '../../Enums/SortType';
import cn from 'classnames';
import { SortingProps } from '../../types/buttons/SortingProps';

export const SortByAlphabet: React.FC<SortingProps> = ({
  sortBy,
  setSortBy,
}) => {
  return (
    <button
      type="button"
      className={cn('button is-info', {
        'is-light': sortBy !== SortType.ALPHABET,
      })}
      onClick={() => setSortBy(SortType.ALPHABET)}
    >
      Sort alphabetically
    </button>
  );
};
