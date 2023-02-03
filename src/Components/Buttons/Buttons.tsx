import React from 'react';
import classNames from 'classnames';
import { SortType } from '../../types/SortType';

type SetSortType = ((a:SortType) => void);
type IsReversed = ((a:boolean) => void);

type Props = {
  sortType: SortType,
  isReversed: boolean,
  setSortType: SetSortType,
  setIsReversed: IsReversed,
};

export const Buttons: React.FC<Props> = ({
  sortType,
  isReversed,
  setSortType,
  setIsReversed,
}) => {
  const resetIsVisible = isReversed || sortType !== SortType.NONE;

  return (
    <div className="buttons">
      <button
        type="button"
        className={classNames(
          'button is-info',
          { 'is-light': sortType !== SortType.ALPHABET },
        )}
        onClick={() => (setSortType(SortType.ALPHABET))}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={classNames(
          'button is-success',
          { 'is-light': sortType !== SortType.LENGTH },
        )}
        onClick={() => (setSortType(SortType.LENGTH))}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={classNames(
          'button is-warning',
          { 'is-light': !isReversed },
        )}
        onClick={() => setIsReversed(!isReversed)}
      >
        Reverse
      </button>

      {(resetIsVisible) && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setIsReversed(false);
            setSortType(SortType.NONE);
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
};
