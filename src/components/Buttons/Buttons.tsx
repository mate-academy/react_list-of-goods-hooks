import React from 'react';
import cn from 'classnames';
import { SortBy } from '../../types/SortBy';

interface Props {
  sortField: string,
  setSortField: (SortBy: string) => void,
  isReversed: boolean,
  setIsReversed: (isReversed: boolean) => void
  reset: () => void
}
export const Buttons: React.FC<Props> = ({
  sortField,
  setSortField,
  isReversed,
  setIsReversed,
  reset,
}) => (
  <div className="buttons">
    <button
      type="button"
      className={cn(
        'button is-info',
        { 'is-light': sortField !== SortBy.alphabet },
      )}
      onClick={() => setSortField(SortBy.alphabet)}
    >
      Sort alphabetically
    </button>

    <button
      type="button"
      className={cn(
        'button is-success',
        { 'is-light': sortField !== SortBy.length },
      )}
      onClick={() => setSortField(SortBy.length)}
    >
      Sort by length
    </button>

    <button
      type="button"
      className={cn(
        'button is-warning',
        { 'is-light': !isReversed },
      )}
      onClick={() => setIsReversed(!isReversed)}
    >
      Reverse
    </button>

    {(sortField || isReversed) && (
      <>
        <button
          type="button"
          className="button is-danger is-light"
          onClick={reset}
        >
          Reset
        </button>
      </>
    )}
  </div>
);
