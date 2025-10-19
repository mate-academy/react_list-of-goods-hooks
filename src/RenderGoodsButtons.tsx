import React from 'react';
import { SortType } from './types';

interface GoodsButtonsProps {
  sortBy: SortType;
  isReversed: boolean;
  onSortAlphabetically: () => void;
  onSortByLength: () => void;
  onReverse: () => void;
  onReset: () => void;
}

export const RenderGoodsButtons: React.FC<GoodsButtonsProps> = ({
  sortBy,
  isReversed,
  onSortAlphabetically,
  onSortByLength,
  onReverse,
  onReset,
}) => {
  const isResetVisible = sortBy !== SortType.None || isReversed;

  return (
    <div className="buttons">
      <button
        type="button"
        className={`button is-info ${sortBy === SortType.Alphabet ? '' : 'is-light'}`}
        onClick={onSortAlphabetically}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={`button is-success ${sortBy === SortType.Length ? '' : 'is-light'}`}
        onClick={onSortByLength}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        onClick={onReverse}
      >
        Reverse
      </button>

      {isResetVisible && (
        <button type="button" className="button is-danger" onClick={onReset}>
          Reset
        </button>
      )}
    </div>
  );
};
