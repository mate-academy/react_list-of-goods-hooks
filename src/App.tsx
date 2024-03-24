import 'bulma/css/bulma.css';
import cn from 'classnames';
import React, { useState } from 'react';
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
  Empty = '',
  Length = 'id',
  Alphabetically = 'alphabetically',
}

type Query = {
  order: 'asc' | 'desc';
};

function getVisibleGoods(
  goods: Array<string>,
  sortField: SortType,
  query: Query = { order: 'asc' },
) {
  const resGoods = [...goods];

  if (sortField) {
    resGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabetically: {
          return good1.localeCompare(good2);
        }

        case SortType.Length: {
          return good1.length - good2.length;
        }
      }
    });
  }

  if (query.order === 'desc') {
    resGoods.reverse();
  }

  return resGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.Empty);
  const [reverse, setReverse] = useState(false);

  const query: Query = {
    order: reverse ? 'desc' : 'asc',
  };
  const visibleGoods = getVisibleGoods(goodsFromServer, sortField, query);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.Alphabetically,
          })}
          onClick={() => setSortField(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.Length,
          })}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !reverse })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortField(SortType.Empty);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
