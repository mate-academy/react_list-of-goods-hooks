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

interface SortModes {
  name: string;
  length: string;
  initial: string;
}

interface SortParams {
  sortField: string;
  reverse: boolean;
}

function getPreparedGoods(goods: string[], { sortField, reverse }: SortParams) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'name':
          return good1.localeCompare(good2);

        case 'length':
          return good1.length - good2.length;

        case 'initial':
        default:
          return 0;
      }
    });

    if (reverse === true) {
      return preparedGoods.sort(() => -1);
    }

    return preparedGoods.sort(() => 1);
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<keyof SortModes>('initial');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== 'name',
          })}
          onClick={() => {
            setSortField('name');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== 'length',
          })}
          onClick={() => {
            setSortField('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverse === false,
          })}
          onClick={() => {
            if (reverse === false) {
              setReverse(true);
            } else {
              setReverse(false);
            }
          }}
        >
          Reverse
        </button>
        {((sortField === 'initial' && reverse === true) ||
          sortField !== 'initial') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('initial');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good, index) => (
          <li data-cy="Good" key={`${good}${index + 1}`}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
