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

enum SortType {
  Alphabetical,
  Length,
}

type Good = string[];

type SortParams = {
  sortField: SortType | null;
  isReversed: boolean;
};

function getSortedGoods(goods: Good, { sortField, isReversed }: SortParams) {
  const sortedGoods = [...goods];

  if (sortField !== null) {
    sortedGoods.sort((a, b) => {
      switch (sortField) {
        case SortType.Alphabetical:
          return a.localeCompare(b);
        case SortType.Length:
          return a.length - b.length;
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
  const [sortField, setSortField] = useState<SortType | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoods = getSortedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Alphabetical,
          })}
          onClick={() => setSortField(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning ', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField !== null || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(null);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {sortedGoods.map(product => (
            <li key={product} data-cy="Good">
              {product}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
