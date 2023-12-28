import React from 'react';
import { SORT_BY } from '../../constanst/sortBy';
import { SortType } from '../../types/SortType';

type Props = {
  setSortby: (value: React.SetStateAction<SortType>) => void;
  setIsReversed: (status: boolean) => void;
  isReversed: boolean;
  sortBy: SortType;
};

export const Buttons: React.FC<Props> = (
  {
    setSortby,
    setIsReversed,
    isReversed,
    sortBy,
  },
) => {
  return (
    <div className="buttons">
      <button
        type="button"
        className={`button is-info ${sortBy !== SORT_BY.ALPHABET && 'is-light'}`}
        onClick={() => setSortby(SORT_BY.ALPHABET)}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={`button is-info ${sortBy !== SORT_BY.LENGTH && 'is-light'}`}
        onClick={() => setSortby(SORT_BY.LENGTH)}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={`button is-info ${!isReversed && 'is-light'}`}
        onClick={() => {
          setIsReversed(!isReversed);
          setSortby(SORT_BY.REVERSE);
        }}
      >
        Reverse
      </button>

      {sortBy !== SortType.reset && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setIsReversed(false);
            setSortby(SortType.reset);
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
};
