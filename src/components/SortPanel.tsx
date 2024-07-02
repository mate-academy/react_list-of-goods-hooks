import React from 'react';
import cn from 'classnames';

import { sortOptions } from '../data/sortOptions';
import { DEFAULT_SORT_TYPE, SortType } from '../types/Sort';

interface Props {
  activeSortType: SortType;
  isReversed: boolean;
  updateSort: (s: SortType) => void;
  updateReversed: (value: boolean) => void;
}

export const SortPanel: React.FC<Props> = ({
  activeSortType,
  isReversed,
  updateSort,
  updateReversed,
}) => {
  const toggleReverse = () => {
    updateReversed(!isReversed);
  };

  const resetSorting = () => {
    updateSort(DEFAULT_SORT_TYPE);
    updateReversed(false);
  };

  return (
    <div className="buttons">
      {sortOptions.map(sort => (
        <button
          type="button"
          className={cn('button', sort.cssClass, {
            'is-light': activeSortType !== sort.type,
          })}
          onClick={() => updateSort(sort.type)}
          key={sort.id}
        >
          {sort.title}
        </button>
      ))}

      <button
        type="button"
        className={cn('button', 'is-warning', { 'is-light': !isReversed })}
        onClick={toggleReverse}
      >
        Reverse
      </button>

      {(activeSortType !== DEFAULT_SORT_TYPE || isReversed) && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={resetSorting}
        >
          Reset
        </button>
      )}
    </div>
  );
};
