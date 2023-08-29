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

enum SortType {
  alpha = 'alpha',
  length = 'length',
  default = '',
}

function getPreparedGoods(
  goods: string[],
  sortType: string,
  reverse: boolean,
) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((a, b) => {
      switch (sortType) {
        case SortType.alpha:
          return a.localeCompare(b);

        case SortType.length:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.default);
  const [sortReverse, setSortReverse] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    sortReverse,
  );

  const reset = () => {
    setSortField(SortType.default);
    setSortReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.alpha)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.alpha,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.length)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setSortReverse(!sortReverse)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !sortReverse,
          })}
        >
          Reverse
        </button>

        {(sortField || sortReverse) && (
          <button
            onClick={reset}
            className="button is-danger is-light"
            type="button"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
