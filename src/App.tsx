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
  length = 'Sort by length',
  Alphabetically = 'Sort alphabetically',
  clear = '',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  isReverse: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((goodA, goodB) => {
      switch (sortField) {
        case SortType.Alphabetically:
          return goodA.localeCompare(goodB);
        case SortType.length:
          return goodA.length - goodB.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.clear);
  const [isReverse, setIsReverse] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    isReverse,
  );

  const handleReverse = () => setIsReverse(!isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Alphabetically)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Alphabetically,
          })}
        >
          {SortType.Alphabetically}
        </button>

        <button
          onClick={() => setSortField(SortType.length)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.length,
          })}
        >
          {SortType.length}
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
        >
          Reverse
        </button>

        {(isReverse || sortField)
        && (
          <button
            onClick={() => {
              setSortField(SortType.clear);
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
