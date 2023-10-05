import React, { useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
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

enum SortType {
  none = '',
  alphabet = 'alphabet',
  length = 'length',
}

interface SortedParams {
  sortField: SortType;
  isReversed: boolean;
}

function getSortedGoods(
  goods: string[],
  { sortField, isReversed }: SortedParams,
): string[] {
  const sortedGoods = [...goods];

  if (sortField) {
    sortedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.alphabet:
          return good1.localeCompare(good2);

        case SortType.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.none);
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = useMemo(() => (
    getSortedGoods(goodsFromServer, { sortField, isReversed })
  ), [goodsFromServer, sortField, isReversed]);

  const handleReverseClick = () => {
    setIsReversed(prevIsReversed => !prevIsReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.alphabet)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.alphabet,
          })}
          aria-label="Sort goods alphabetically"
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.length)}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.length,
          })}
          aria-label="Sort goods by length"
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverseClick}
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          aria-label="Reverse sort"
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            onClick={() => {
              setSortField(SortType.none);
              setIsReversed(false);
            }}
            className="button is-danger is-light"
            aria-label="Reset sort"
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
