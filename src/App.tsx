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

enum SortField {
  Name = 'name',
  Length = 'length',
  Empty = '',
}

interface FilterParam {
  sortField: SortField,
  isReversed: boolean,
}

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: FilterParam,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((goodA, goodB) => {
      switch (sortField) {
        case SortField.Name:
          return goodA.localeCompare(goodB);

        case SortField.Length:
          return goodA.length - goodB.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortField.Empty);
  const [isReversed, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const reset = () => {
    setSortField(SortField.Empty);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortField.Name)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortField.Name,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortField.Length)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortField.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(currentState => !currentState)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
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
