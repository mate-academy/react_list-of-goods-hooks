import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';
import classNames from 'classnames';

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
  alphabet = 'alphabet',
  length = 'length',
  none = 'none',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField !== SortType.none) {
    preparedGoods.sort((good1, good2) => {
      if (sortField === SortType.length) {
        return good1.length - good2.length;
      }

      if (sortField === SortType.alphabet) {
        return good1.localeCompare(good2);
      }

      return 0;
    });
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.none);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.alphabet)}
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.length)}
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.length,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(prevState => !prevState)}
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortField !== SortType.none || isReversed) && (
          <button
            type="button"
            onClick={() => {
              setSortField(SortType.none);
              setIsReversed(false);
            }}
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
