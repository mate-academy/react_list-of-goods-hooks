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
  RESET = '',
  NAME = 'name',
  LENGTH = 'length',
}

interface FilterParams {
  isReversed: boolean;
  sortField: SortType;
}

function getPreparedGoods<T>(
  goods: T[],
  { isReversed, sortField }: FilterParams,
) {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SortType.NAME:
      preparedGoods.sort((a, b) => String(a).localeCompare(String(b)));
      break;

    case SortType.LENGTH:
      preparedGoods.sort((a, b) => String(a).length - String(b).length);
      break;
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.RESET);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    isReversed,
    sortField,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.NAME)}
          className={cn('button is-info', {
            'is-light': sortField !== SortType.NAME,
          })}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          onClick={() => setSortField(SortType.LENGTH)}
          className={cn('button is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(prev => !prev)}
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortField !== '' || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.RESET);
              setIsReversed(false);
            }}
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
