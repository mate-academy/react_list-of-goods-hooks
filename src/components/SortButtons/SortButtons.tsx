import cn from 'classnames';
import React from 'react';
import { SortType } from '../../types/SortType';

interface Props {
  currentSortField: SortType;
  isReversed: boolean;
  onSortButtonClick: (sortField: SortType) => void;
  onReverseButtonClick: () => void;
  onReset: () => void;
}

export const SortButtons: React.FC<Props> = ({
  currentSortField,
  isReversed,
  onSortButtonClick,
  onReverseButtonClick,
  onReset,
}) => {
  const showReset = isReversed || currentSortField !== SortType.Default;

  return (
    <div className="buttons">
      <button
        type="button"
        className={cn('button is-info', {
          'is-light': currentSortField !== SortType.Alphabetic,
        })}
        onClick={() => {
          onSortButtonClick(SortType.Alphabetic);
        }}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={cn('button is-success', {
          'is-light': currentSortField !== SortType.Length,
        })}
        onClick={() => {
          onSortButtonClick(SortType.Length);
        }}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={cn('button is-warning', { 'is-light': !isReversed })}
        onClick={onReverseButtonClick}
      >
        Reverse
      </button>

      {showReset && (
        <button
          type="button"
          className={cn('button is-danger is-light')}
          onClick={onReset}
        >
          onReset
        </button>
      )}
    </div>
  );
};
