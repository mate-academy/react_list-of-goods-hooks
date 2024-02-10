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

interface SortBy {
  sortBy: string | '';
  isReversed: boolean;
}

enum SortType {
  SORT_AB = 'alphabetically',
  SORT_LENGTH = 'length',
}

function getSortedGoods(goods: string[], { sortBy, isReversed }: SortBy) {
  const sortedGoods = [...goods];

  if (sortBy === SortType.SORT_AB) {
    sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
  } else if (sortBy === SortType.SORT_LENGTH) {
    sortedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortBy, getSortBy] = useState('');
  const [isReversed, getIsReversed] = useState(false);
  const visibleGoods = getSortedGoods(goodsFromServer, { sortBy, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SortType.SORT_AB,
          })}
          onClick={() => getSortBy(SortType.SORT_AB)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SortType.SORT_LENGTH,
          })}
          onClick={() => getSortBy(SortType.SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': isReversed === false,
          })}
          onClick={() => getIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              getSortBy('');
              getIsReversed(false);
            }}
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
