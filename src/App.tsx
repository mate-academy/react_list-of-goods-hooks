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
  Length = 'length',
  Alphabetically = 'alphabetically',
}

type Query = {
  reverse: boolean;
};

function getVisibleGoods(
  goods: Array<string>,
  sortField: SortType,
  query: Query = { reverse: false },
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

  if (query.reverse) {
    resGoods.reverse();
  }

  return resGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.Empty);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getVisibleGoods(goodsFromServer, sortField, {
    reverse: isReversed,
  });

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
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortField(SortType.Empty);
              setIsReversed(false);
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
