import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortBy {
  Default = '',
  Alphabetically = 'alphabetically',
  Length = 'length',
}

interface FilterParams {
  sortBy: SortBy;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortBy, isReversed }: FilterParams,
): string[] {
  const currentVisibleGoods = [...goods];

  if (sortBy) {
    currentVisibleGoods.sort((good1: string, good2: string) => {
      if (sortBy === SortBy.Alphabetically) {
        return good1.localeCompare(good2);
      }

      if (sortBy === SortBy.Length) {
        return good1.length - good2.length;
      }

      return 0;
    });
  }

  if (isReversed) {
    currentVisibleGoods.reverse();
  }

  return currentVisibleGoods;
}

export const App: React.FC = () => {
  const [sortByState, setSortByState] = useState(SortBy.Default);
  const [reversedState, setReversedState] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortBy: sortByState,
    isReversed: reversedState,
  });

  const resetHandler = (): void => {
    setSortByState(SortBy.Default);
    setReversedState(false);
  };

  const isGoodsSorted = sortByState || reversedState;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortByState !== SortBy.Alphabetically,
          })}
          onClick={() => setSortByState(SortBy.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortByState !== SortBy.Length,
          })}
          onClick={() => setSortByState(SortBy.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reversedState,
          })}
          onClick={
            !reversedState
              ? () => setReversedState(true)
              : () => setReversedState(false)
          }
        >
          Reverse
        </button>

        {isGoodsSorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetHandler}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map((good: string) => (
            <li data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
