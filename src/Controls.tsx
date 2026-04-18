import React from 'react';
import cn from 'classnames';
import { SortType } from './constants';

interface Buttons {
  sortField: SortType;
  onSortField: (sortField: SortType) => void;
  isReversed: boolean;
  onIsReversed: (isReversed: boolean) => void;
}

export const Controls: React.FC<Buttons> = ({
  sortField,
  onSortField,
  isReversed,
  onIsReversed,
}) => (
  <div className="buttons">
    <button
      type="button"
      className={cn('button is-info', {
        'is-light': sortField !== SortType.Alphabet,
      })}
      onClick={() => onSortField(SortType.Alphabet)}
    >
      Sort alphabetically
    </button>

    <button
      type="button"
      className={cn('button is-success', {
        'is-light': sortField !== SortType.Length,
      })}
      onClick={() => onSortField(SortType.Length)}
    >
      Sort by length
    </button>

    <button
      type="button"
      className={cn('button is-warning', {
        'is-light': !isReversed,
      })}
      onClick={() => onIsReversed(!isReversed)}
    >
      Reverse
    </button>
    {(sortField || isReversed) && (
      <button
        type="button"
        className="button is-danger is-light"
        onClick={() => {
          onSortField(SortType.None);
          onIsReversed(false);
        }}
      >
        Reset
      </button>
    )}
  </div>
);
