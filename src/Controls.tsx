import React from 'react';
import cn from 'classnames';
import { SORT_FIELD } from './constants';

interface Buttons {
  sortField: string;
  onSortField: (sortField: string) => void;
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
        'is-light': sortField !== SORT_FIELD.ALPHABET,
      })}
      onClick={() => onSortField(SORT_FIELD.ALPHABET)}
    >
      Sort alphabetically
    </button>

    <button
      type="button"
      className={cn('button is-success', {
        'is-light': sortField !== SORT_FIELD.LENGTH,
      })}
      onClick={() => onSortField(SORT_FIELD.LENGTH)}
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
          onSortField('');
          onIsReversed(false);
        }}
      >
        Reset
      </button>
    )}
  </div>
);
