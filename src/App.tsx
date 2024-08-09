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

export const App: React.FC = () => {
  const [sortField, setsortField] = useState('');
  const [reverse, setreverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });
  const reset = () => {
    setsortField('');
    setreverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setsortField(SortField.ALPHABETICALLY)}
          className={cn('button is-info', {
            'is-light': sortField !== SortField.ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setsortField(SortField.LENGTH)}
          className={cn('button is-info', {
            'is-light': sortField !== SortField.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setreverse(!reverse)}
          className={cn('button is-info', {
            'is-light': !reverse,
          })}
        >
          Reverse
        </button>

        {(reverse || sortField) && (
          <button
            type="button"
            onClick={reset}
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
