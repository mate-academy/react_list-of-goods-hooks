import React from 'react';
import { SortBy } from '../../Types/sortBy';

interface Props {
  sortBy: SortBy | null;
  setSortBy: React.Dispatch<React.SetStateAction<SortBy | null>>;
  isReversed: boolean;
  setIsReversed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Buttons: React.FC<Props> = ({
  sortBy,
  setSortBy,
  isReversed,
  setIsReversed,
}) => {
  return (
    <div className="buttons">
      <button
        type="button"
        className={`button is-info ${sortBy !== SortBy.alphabet && 'is-light'}`}
        onClick={() => setSortBy(SortBy.alphabet)}
      >
        Sort alphabetically
      </button>
      <button
        type="button"
        className={`button is-success ${
          sortBy !== SortBy.length && 'is-light'
        }`}
        onClick={() => setSortBy(SortBy.length)}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={`button is-warning ${!isReversed && 'is-light'}`}
        onClick={() => setIsReversed(!isReversed)}
      >
        Reverse
      </button>

      {(sortBy || isReversed) && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setSortBy(null);
            setIsReversed(false);
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
};
