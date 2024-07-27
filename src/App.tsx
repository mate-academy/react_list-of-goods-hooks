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
  NONE = 'none',
  NAME = 'name',
  LENGTH = 'length',
}

interface SortOptions {
  sortField: SortType;
}

function getSortedGoods(goods: string[], { sortField }: SortOptions): string[] {
  const sortedGoods = [...goods];

  if (sortField !== SortType.NONE) {
    sortedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.NAME:
          return good1.localeCompare(good2);
        case SortType.LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.NONE);
  const [reversed, setReversed] = useState<boolean>(false);
  const reset = () => {
    setSortField(SortType.NONE);
    setReversed(false);
  };

  let visibleGoods = getSortedGoods(goodsFromServer, { sortField });

  if (reversed) {
    visibleGoods = [...visibleGoods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.NAME,
          })}
          onClick={() => setSortField(SortType.NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reversed === false,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {sortField === SortType.NONE && reversed === false ? (
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
