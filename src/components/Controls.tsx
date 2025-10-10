import React from 'react';
import cn from 'classnames';
import { SortType } from '../types/SortType';

interface ControlsProps {
  sortType: SortType;
  isReversed: boolean;
  onSortAlpha: () => void;
  onSortByLength: () => void;
  onReverse: () => void;
  onReset: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  sortType,
  isReversed,
  onSortAlpha,
  onSortByLength,
  onReverse,
  onReset,
}) => {
  const shouldShowReset = sortType !== SortType.None || isReversed;

  return (
    <div className="buttons">
      <button
        type="button"
        className={cn('button is-info', {
          'is-light': sortType !== SortType.Alphabetically,
        })}
        onClick={onSortAlpha}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={cn('button is-success', {
          'is-light': sortType !== SortType.ByLength,
        })}
        onClick={onSortByLength}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={cn('button is-warning', {
          'is-light': !isReversed,
        })}
        onClick={onReverse}
      >
        Reverse
      </button>

      {shouldShowReset && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={onReset}
        >
          Reset
        </button>
      )}
    </div>
  );
};
