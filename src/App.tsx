import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import cn from 'classnames';

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

const SORT_BY = {
  ALPHA: 'alpha',
  LENGTH: 'length',
};

type SortingParams = {
  sortBy: string,
  reverse: boolean
};

function getVisibleGoods(
  goods:string[],
  {
    sortBy,
    reverse,
  }: SortingParams,
): string[] {
  const result = [...goods];

  if (sortBy) {
    result.sort((a, b) => {
      switch (sortBy) {
        case SORT_BY.ALPHA:
          return a.localeCompare(b);
        case SORT_BY.LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    result.reverse();
  }

  return result;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState('');
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getVisibleGoods(goodsFromServer,
    { sortBy, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SORT_BY.ALPHA,
          })}
          onClick={() => setSortBy(SORT_BY.ALPHA)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SORT_BY.LENGTH,
          })}
          onClick={() => setSortBy(SORT_BY.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning ', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortBy || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        { visibleGoods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
