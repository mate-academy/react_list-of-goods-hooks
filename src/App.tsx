import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer: string[] = [
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

enum SortType {
  Alphabet = 'ALPHABET',
  Length = 'LENGTH',
}

type Options = {
  sortBy: SortType | null;
  isReversed: boolean;
};

const areArraysEqual = <T,>(a: T[], b: T[]): boolean => {
  return a.length === b.length && a.every((val, index) => val === b[index]);
};

function getPreparedGoods(
  goods: readonly string[],
  { sortBy, isReversed }: Options,
): string[] {
  const preparedGoods = [...goods];

  if (sortBy === SortType.Alphabet || sortBy === SortType.Length) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);
        case SortType.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortBy,
    isReversed,
  });

  const handleSortChange = (sortType: SortType) => {
    setSortBy(sortType);
  };

  const handleReverseToggle = () => setIsReversed(prev => !prev);
  const handleReset = () => {
    setSortBy(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => handleSortChange(SortType.Alphabet)}
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => handleSortChange(SortType.Length)}
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SortType.Length,
          })}
        >
          Sort by length
        </button>
        <button
          type="button"
          onClick={handleReverseToggle}
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>
        {!areArraysEqual(visibleGoods, goodsFromServer) && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
