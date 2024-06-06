import React from 'react';
import { useState } from 'react';
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
  Alphabetically = 'alphabetically',
  Length = 'length',
  Default = '',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  isReverse: boolean,
) {
  const prepareGoods = [...goods];

  if (sortField) {
    prepareGoods.sort((a, b) => {
      switch (sortField) {
        case SortType.Alphabetically:
           return a.localeCompare(b);

        case SortType.Length:
          return a.length - b.length;

        default:
          return 0;
      }
    })
  }

  if (isReverse) {
    prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.Default);
  const [isReverse, setIsReverse] = useState(false);

  const sortedGoods = getPreparedGoods(goodsFromServer, sortField, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Alphabetically)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.Alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.Length)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReverse(!isReverse)}
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReverse })}
        >
          Reverse
        </button>

        {(sortField || isReverse) && (
          <button
            onClick={() => {
              setSortField(SortType.Default);
              setIsReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
