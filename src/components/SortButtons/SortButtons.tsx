import cn from 'classnames';
import React from 'react';
import { SortType } from '../../types/SortType';

interface Props {
  currentSortField: SortType;
  isReversed: boolean;
  handleSortButtonClick: (sortField: SortType) => void;
  handleReverseButtonClick: () => void;
  handleReset: () => void;
}

export const SortButtons: React.FC<Props> = ({
  currentSortField,
  isReversed,
  handleSortButtonClick,
  handleReverseButtonClick,
  handleReset,
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
          handleSortButtonClick(SortType.Alphabetic);
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
          handleSortButtonClick(SortType.Length);
        }}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={cn('button is-warning', { 'is-light': !isReversed })}
        onClick={handleReverseButtonClick}
      >
        Reverse
      </button>

      {showReset && (
        <button
          type="button"
          className={cn('button is-danger is-light')}
          onClick={handleReset}
        >
          Reset
        </button>
      )}
    </div>
  );
};
