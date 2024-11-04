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
  name = 'name',
  length = 'length',
}

interface FilterParams {
  field: SortField | '';
  isReverse: boolean;
}

const prepareGoods = (goods: string[], { field, isReverse }: FilterParams) => {
  const preparedGoods = [...goods];

  if (field) {
    preparedGoods.sort((good1, good2) => {
      switch (field) {
        case SortField.name:
          return good1.localeCompare(good2);
        case SortField.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return isReverse ? preparedGoods.reverse() : preparedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField | ''>('');
  const [reverse, setReverse] = useState(false);
  const showGoods = prepareGoods(goodsFromServer, {
    field: sortField,
    isReverse: reverse,
  });

  const reset = () => {
    setSortField('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortField.name,
          })}
          onClick={() => setSortField(SortField.name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortField.length,
          })}
          onClick={() => setSortField(SortField.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {showGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
