import React from 'react';
import { useState } from 'react';
import classNames from 'classnames';

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

enum SortType {
  none,
  alphabet,
  length,
}

function getPreperedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const preperedGoods = [...goods];

  preperedGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.alphabet:
        return good1.localeCompare(good2);

      case SortType.length:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.none);
  const [isReversed, setReversed] = useState(false);
  const sortedGoods = getPreperedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== SortType.alphabet,
          })}
          onClick={() => setSortType(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== SortType.length,
          })}
          onClick={() => setSortType(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setReversed(!isReversed)}
        >
          Reverse
        </button>

        {(isReversed || sortType) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReversed(false);
              setSortType('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
