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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

type SortBy = typeof SORT_BY_ALPHABET | typeof SORT_BY_LENGTH;

type Options = {
  sortBy: SortBy | null;
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

  if (sortBy === SORT_BY_ALPHABET || sortBy === SORT_BY_LENGTH) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
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
  const [sortBy, setSortBy] = useState<SortBy | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortBy,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortBy(SORT_BY_ALPHABET)}
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortBy(SORT_BY_LENGTH)}
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>
        <button
          type="button"
          onClick={() => setIsReversed(prev => !prev)}
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>
        {!areArraysEqual(visibleGoods, goodsFromServer) && (
          <button
            type="button"
            onClick={() => {
              setSortBy(null);
              setIsReversed(false);
            }}
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
