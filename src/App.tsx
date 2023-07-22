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

enum SortField {
  name = 'name',
  length = 'length',
  empty = '',
}

type ReorderParams = {
  sortField: SortField,
  reverseIsActive: boolean,
};

function getPreparedGoods(
  goods: string[],
  { sortField, reverseIsActive }: ReorderParams,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.name:
          return good1.localeCompare(good2);

        case SortField.length:
          return good1[SortField.length] - good2[SortField.length];

        default:
          return 0;
      }
    });
  }

  if (reverseIsActive) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortField.empty);
  const [reverseIsActive, setReverseIsActive] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortField, reverseIsActive },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortField.name)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortField.name,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortField.length)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortField.length,
          })}
        >
          Sort by length
        </button>

        {
          reverseIsActive
            ? (
              <button
                onClick={() => {
                  setReverseIsActive(false);
                  setSortField(sortField);
                }}
                type="button"
                className={cn('button is-warning', {
                  'is-light': !reverseIsActive,
                })}
              >
                Reverse
              </button>
            )
            : (
              <button
                onClick={() => {
                  setReverseIsActive(true);
                  setSortField(sortField);
                }}
                type="button"
                className={cn('button is-warning', {
                  'is-light': !reverseIsActive,
                })}
              >
                Reverse
              </button>
            )
        }

        {
          (sortField !== '' || reverseIsActive)
            && (
              <button
                onClick={() => {
                  setSortField(SortField.empty);
                  setReverseIsActive(false);
                }}
                type="button"
                className="button is-danger is-light"
              >
                Reset
              </button>
            )
        }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li className="Good" key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
