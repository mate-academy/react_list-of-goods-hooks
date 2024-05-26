import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

export const goodsFromServer: string[] = [
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
type SortField = {
  DEFAULT: string;
  FIELD_NAME: string;
  FIELD_LENGTH: string;
};
type SortBy = {
  sortField: string;
  order: boolean;
};

const SORT: SortField = {
  DEFAULT: '',
  FIELD_NAME: 'name',
  FIELD_LENGTH: 'length',
};

function getPreparedGoods(goods: string[], { sortField, order }: SortBy) {
  const newGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT.FIELD_NAME:
         newGoods.sort((good1: string, good2: string) => good1.localeCompare(good2));
        break;
      case SORT.FIELD_LENGTH:
         newGoods.sort((good1: string, good2: string) => good1.length - good2.length);
        break;
      default:
        return 0;
    }
  }

  if (order) {
    newGoods.reverse();
  }

  return newGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SORT.DEFAULT);
  const [order, setOrder] = useState(false);
  const visibleGoods: string[] | 0 = getPreparedGoods(goodsFromServer, {
    sortField,
    order,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT.FIELD_NAME,
          })}
          onClick={() => setSortField(SORT.FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT.FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORT.FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !order,
          })}
          onClick={() => setOrder(!order)}
        >
          Reverse
        </button>

        {(sortField || order) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SORT.DEFAULT);
              setOrder(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {Array.isArray(visibleGoods) ? (visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))) : (
            <li>No goods available</li>
        )}
      </ul>
    </div>
  );
};

