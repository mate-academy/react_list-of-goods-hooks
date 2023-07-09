import React from 'react';
import cn from 'classnames';
import { SortType } from './enums/SortType';

type Props = {
  sortBy: React.Dispatch<React.SetStateAction<SortType>>,
  onReverse: React.Dispatch<React.SetStateAction<boolean>>,
  sortType: string,
  isReversed: boolean,
};

export const Buttons: React.FC<Props> = ({
  sortBy,
  onReverse,
  sortType,
  isReversed,
}) => {
  const isShowResetButton = sortType || isReversed;

  const clearSortType = () => {
    sortBy(SortType.Default);
    onReverse(false);
  };

  return (
    <div className="buttons">
      <button
        type="button"
        className={cn('button is-info', {
          'is-light': sortType !== SortType.Alphabet,
        })}
        onClick={() => sortBy(SortType.Alphabet)}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={cn('button is-success', {
          'is-light': sortType !== SortType.Length,
        })}
        onClick={() => sortBy(SortType.Length)}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={cn('button is-warning', {
          'is-light': !isReversed,
        })}
        onClick={() => onReverse((reversed: boolean) => !reversed)}
      >
        Reverse
      </button>

      {isShowResetButton && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => clearSortType()}
        >
          Reset
        </button>
      )}

    </div>
  );
};
