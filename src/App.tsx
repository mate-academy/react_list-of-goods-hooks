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

enum SortField {
  ALPHABETICALLY = 'alphabetically',
  LENGTH = 'length',
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
        case SortField.ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SortField.LENGTH:
          return good1.length - good2.length;

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

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  const getButtonClass = (field: string) =>
    cn('button', {
      'is-info': field === SortField.ALPHABETICALLY,
      'is-success': field === SortField.LENGTH,
      'is-light': sortField !== field,
    });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortField.ALPHABETICALLY)}
          type="button"
          className={getButtonClass(SortField.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortField.LENGTH)}
          type="button"
          className={getButtonClass(SortField.LENGTH)}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(prev => !prev)}
          type="button"
          className={cn('button', {
            'is-warning': reverse,
            'is-light': !reverse,
          })}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            onClick={() => {
              setSortField('');
              setReverse(false);
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
