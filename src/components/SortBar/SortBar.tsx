import React from 'react';
import cn from 'classnames';
import { SORT_ALPHABET, SORT_LENGTH } from '../../variables/constants';

interface Props {
  isReversed: boolean
  sortMethod: string
  sortBy: React.Dispatch<React.SetStateAction<string>>
  onReverse: React.Dispatch<React.SetStateAction<boolean>>
}

export const SortBar: React.FC<Props> = ({ sortBy,
  onReverse,
  isReversed,
  sortMethod,
}) => (
  <div className="buttons">
    <button
      onClick={() => sortBy(SORT_ALPHABET)}
      type="button"
      className={cn('button is-info', {
        'is-light': sortMethod !== SORT_ALPHABET,
      })}
    >
      Sort alphabetically
    </button>

    <button
      onClick={() => sortBy(SORT_LENGTH)}
      type="button"
      className={cn('button is-success', {
        'is-light': sortMethod !== SORT_LENGTH,
      })}
    >
      Sort by length
    </button>

    <button
      onClick={() => onReverse(!isReversed)}
      type="button"
      className={cn('button is-warning', {
        'is-light': isReversed === false,
      })}
    >
      Reverse
    </button>

    {(sortMethod || isReversed) && (
      <button
        onClick={() => {
          onReverse(false);
          sortBy('');
        }}
        type="button"
        className="button is-danger is-light"
      >
        Reset
      </button>
    )}
  </div>
);
