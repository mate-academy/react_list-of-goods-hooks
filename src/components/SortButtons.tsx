import cn from 'classnames';

import { SortType } from '../types/sortTypes';

type SortButtonProps = {
  sortBy: SortType;
  handleSort: (sortCase: SortType) => void;
  isReverse: boolean;
  handleIsReverse: (isReversed: boolean) => void;
};

export function SortButtons({
  sortBy,
  handleSort,
  isReverse,
  handleIsReverse,
}: SortButtonProps) {
  return (
    <div className="buttons">
      <button
        type="button"
        className={cn('button is-info', {
          'is-light': sortBy !== SortType.Name,
        })}
        onClick={() => handleSort(SortType.Name)}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={cn('button is-success', {
          'is-light': sortBy !== SortType.Length,
        })}
        onClick={() => handleSort(SortType.Length)}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={cn('button is-warning', { 'is-light': !isReverse })}
        onClick={() => handleIsReverse(!isReverse)}
      >
        Reverse
      </button>

      {(sortBy !== SortType.None || isReverse) && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            handleIsReverse(false);
            handleSort(SortType.None);
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
}
