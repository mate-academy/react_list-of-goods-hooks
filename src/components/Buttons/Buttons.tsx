import React from 'react';
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
  const showResetBtn = () => {
    return sortBy !== SortType.initial || isReversed;
  };

  return (
    <div className="buttons">
      <button
        type="button"
        className={`button is-info ${sortBy !== SortType.alphabet && 'is-light'}`}
        onClick={() => setSortby(SortType.alphabet)}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={`button is-success ${sortBy !== SortType.length && 'is-light'}`}
        onClick={() => setSortby(SortType.length)}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={`button is-warning ${!isReversed && 'is-light'}`}
        onClick={() => {
          setIsReversed(!isReversed);
        }}
      >
        Reverse
      </button>

      {showResetBtn() && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setIsReversed(false);
            setSortby(SortType.initial);
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
};
