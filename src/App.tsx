import React, { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

import { SortType } from './types/SortType';
import { PreparedGoods } from './types/PreparedGoods';
import { Good } from './types/Good';

export const goodsFromServer: Good[] = [
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

const getPreparedGoods: PreparedGoods = (
  goods,
  sortField,
  isReversedActive,
) => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.byName:
          return good1.localeCompare(good2);
        case SortType.byLength:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversedActive) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.byDefault);
  const [isReversedActive, setIsReversedActive] = useState(false);
  const visibleGoods: Good[] = getPreparedGoods(
    goodsFromServer,
    sortField,
    isReversedActive,
  );
  const isResetVisible = sortField || isReversedActive;

  const reset = () => {
    setSortField(SortType.byDefault);
    setIsReversedActive(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', ' is-info', {
            'is-light': sortField !== SortType.byName,
          })}
          onClick={() => setSortField(SortType.byName)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.byLength,
          })}
          onClick={() => setSortField(SortType.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversedActive,
          })}
          onClick={() => setIsReversedActive(!isReversedActive)}
        >
          Reverse
        </button>

        {isResetVisible && (
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
        {visibleGoods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
