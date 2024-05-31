/* eslint-disable prettier/prettier */
import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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
  SORT_APLHABETICALLY = 'alphabet',
  SORT_LENGTH = 'length',
}

// eslint-disable-next-line max-len
function getPreparedGoods(goods: string[], sortField: string, query: boolean) {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SortType.SORT_APLHABETICALLY:
      preparedGoods.sort();
      break;

    case SortType.SORT_LENGTH:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      break;
  }

  if (!query) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [query, setQuery] = useState(true);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, query);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.SORT_APLHABETICALLY,
          })}
          onClick={() => {
            setSortField(SortType.SORT_APLHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.SORT_LENGTH,
          })}
          onClick={() => {
            setSortField(SortType.SORT_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': query,
          })}
          onClick={() => {
            setQuery(!query);
          }}
        >
          Reverse
        </button>

        {(!sortField && query) || (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setQuery(true);
            }}
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
