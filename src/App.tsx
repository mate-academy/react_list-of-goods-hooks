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

enum SortType {
  alphabet = 'title',
  byLength = 'length',
  empty = '',
}

function getPreparedGoods(
  goods: string[],
  sortBy: string,
  isReversed: boolean,
) {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((a, b) => {
      switch (sortBy) {
        case SortType.alphabet:
          return a.localeCompare(b);

        case SortType.byLength:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.empty);
  const [isReversed, setIsReversed] = useState(false);
  const allGoods = getPreparedGoods(goodsFromServer, sortBy, isReversed);

  const reset = () => {
    setSortBy(SortType.empty);
    setIsReversed(false);
  };

  const isReset = sortBy || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SortType.alphabet,
          })}
          onClick={() => setSortBy(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SortType.byLength,
          })}
          onClick={() => setSortBy(SortType.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isReset && (
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
        {allGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
