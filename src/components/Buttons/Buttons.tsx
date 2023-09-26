import cn from 'classnames';
import React from 'react';
import { SortType } from '../../types/SortType';

type Props = {
  sortField: SortType | string,
  sortBy: (field: SortType | string) => void,
  isReversed: boolean,
  setReverse: (field: boolean) => void,
};

export const Buttons: React.FC<Props> = ({
  sortField,
  sortBy,
  isReversed,
  setReverse,
}) => {
  const resetCkilck = () => {
    setReverse(false);
    sortBy(SortType.SORT_DEFAULT_STATE);
  };

  return (
    <div className="buttons">
      <button
        type="button"
        className={cn(
          'button is-info', {
            'is-light': sortField !== SortType.SORT_FIELD_ORDER,
          },
        )}
        onClick={() => sortBy(SortType.SORT_FIELD_ORDER)}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={cn('button is-success', {
          'is-light': sortField !== SortType.SORT_FIELD_LENGTH,
        })}
        onClick={() => sortBy(SortType.SORT_FIELD_LENGTH)}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={cn('button is-warning', { 'is-light': !isReversed })}
        onClick={() => setReverse(!isReversed)}
      >
        Reverse
      </button>

      {(sortField || isReversed) && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={resetCkilck}
        >
          Reset
        </button>
      )}
    </div>
  );
};
