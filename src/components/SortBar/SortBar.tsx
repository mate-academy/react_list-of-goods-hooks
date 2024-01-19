import React from 'react';
import cn from 'classnames';
import { SortType } from '../../types/Good';

type Props = {
  sortBy: SortType,
  changeSortMethods: (sortBy: SortType) => void,
  setSortByDefault: () => void,
  isReversed: boolean,
  setIsReversed: (isReversed: boolean) => void,
};

export const SortBar: React.FC<Props> = ({
  sortBy: isSortedBy,
  changeSortMethods,
  setSortByDefault,
  isReversed,
  setIsReversed,
}) => {
  return (
    <div className="buttons">
      <button
        onClick={() => changeSortMethods(SortType.Alphabet)}
        type="button"
        className={
          cn(
            'button',
            'is-info',
            {
              'is-light': isSortedBy !== SortType.Alphabet,
            },
          )
        }
      >
        Sort alphabetically
      </button>

      <button
        onClick={() => changeSortMethods(SortType.Length)}
        type="button"
        className={
          cn(
            'button',
            'is-success',
            {
              'is-light': isSortedBy !== SortType.Length,
            },
          )
        }
      >
        Sort by length
      </button>

      <button
        onClick={() => setIsReversed(!isReversed)}
        type="button"
        className={cn(
          'button',
          'is-warning',
          {
            'is-light': !isReversed,
          },
        )}
      >
        Reverse
      </button>

      {(isSortedBy || isReversed) && (
        <button
          onClick={() => setSortByDefault()}
          type="button"
          className="button is-danger is-light"
        >
          Reset
        </button>
      )}
    </div>
  );
};
