import cn from 'classnames';
import React from 'react';
import { SortType } from '../../types/SortType';

interface Props {
  sortField: SortType;
  onSort: (type: SortType) => void;
  isReversed: boolean;
  onReverse: () => void;
  resetList: () => void;
}

export const Controls: React.FC<Props> = ({
  sortField,
  onSort,
  isReversed,
  onReverse,
  resetList,
}) => (
  <div className="buttons">
    <button
      type="button"
      className={cn('button', 'is-info', {
        'is-light': sortField !== SortType.ALPHABET,
      })}
      onClick={() => onSort(SortType.ALPHABET)}
    >
      Sort alphabetically
    </button>

    <button
      type="button"
      className={cn('button', 'is-success', {
        'is-light': sortField !== SortType.LENGTH,
      })}
      onClick={() => onSort(SortType.LENGTH)}
    >
      Sort by length
    </button>

    <button
      type="button"
      className={cn('button', 'is-warning', {
        'is-light': !isReversed,
      })}
      onClick={() => onReverse()}
    >
      Reverse
    </button>

    {(sortField || isReversed) && (
      <button
        type="button"
        className="button is-danger is-light"
        onClick={resetList}
      >
        Reset
      </button>
    )}
  </div>
);
