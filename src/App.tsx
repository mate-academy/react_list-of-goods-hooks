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
  Name = 'name',
  Length = 'length',
  Empty = '',
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
        case SortField.Name:
          return good1.localeCompare(good2);

        case SortField.Length:
          return good1.length - good2.length;

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
  const [sortField, setSortField] = useState(SortField.Empty);
  const [reverseIsActive, setReverseIsActive] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortField, reverseIsActive },
  );

  function makeReverseActive() {
    setReverseIsActive(true);
    setSortField(sortField);
  }

  function makeReverseNotActive() {
    setReverseIsActive(false);
    setSortField(sortField);
  }

  function resetSorting() {
    setSortField(SortField.Empty);
    setReverseIsActive(false);
  }

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

        {
          reverseIsActive
            ? (
              <button
                onClick={makeReverseNotActive}
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
                onClick={makeReverseActive}
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
          (sortField !== SortField.Empty || reverseIsActive)
          && (
            <button
              onClick={resetSorting}
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
