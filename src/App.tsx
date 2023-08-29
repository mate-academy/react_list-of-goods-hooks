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

// const SORT_FIELD_ALPHA = 'alpha';
// const SORT_FIELD_LENGTH = 'length';

enum SortType {
  alpha = 'alpha',
  length = 'length',
  default = 0,
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
          return SortType.default;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [sortReverse, setSortReverse] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    sortReverse,
  );

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
          onClick={() => setSortReverse(sortReverse === false)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !sortReverse,
          })}
        >
          Reverse
        </button>

        {(sortField || sortReverse === true) && (
          <button
            onClick={() => {
              setSortField('');
              setSortReverse(false);
            }}
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
