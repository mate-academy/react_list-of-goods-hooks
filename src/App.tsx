import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

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
  none = 'none',
  name = 'name',
  length = 'length',
}

interface SortOptions {
  sortField: SortType;
}

function getSortedGoods(goods: string[], { sortField }: SortOptions): string[] {
  const sortedGoods = [...goods];

  if (sortField !== SortType.none) {
    sortedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.name:
          return good1.localeCompare(good2);
        case SortType.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.none);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const reset = () => {
    setSortField(SortType.none);
    setIsReversed(false);
  };

  const sortedGoods = getSortedGoods(goodsFromServer, { sortField });
  const visibleGoods = isReversed ? [...sortedGoods].reverse() : sortedGoods;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.name,
          })}
          onClick={() => setSortField(SortType.name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prevReversed => !prevReversed)}
        >
          Reverse
        </button>

        {sortField === SortType.none && !isReversed ? (
          ''
        ) : (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
