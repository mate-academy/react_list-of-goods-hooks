import React from 'react';
import cn from 'classnames';

import { SortType } from '../App';

type Props = {
  sortBy: (value: SortType) => void;
  setReverse: () => void;
  reset: () => void;
  sortField: SortType;
  reverse: boolean;
};

export const Buttons: React.FC<Props> = ({
  sortBy,
  reset,
  sortField,
  reverse,
  setReverse,
}) => {
  const isResetVisible = reverse || sortField !== SortType.NONE;

  return (
    <div className="buttons">
      <button
        type="button"
        className={cn('button', 'is-info', {
          'is-light': sortField !== SortType.ALPHABET,
        })}
        onClick={() => sortBy(SortType.ALPHABET)}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={cn('button', 'is-success', {
          'is-light': sortField !== SortType.LENGTH,
        })}
        onClick={() => sortBy(SortType.LENGTH)}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={cn('button', 'is-warning', {
          'is-light': !reverse,
        })}
        onClick={setReverse}
      >
        Reverse
      </button>
      {isResetVisible && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={reset}
        >
          Reset
        </button>
      )}
    </div>
  );
};
