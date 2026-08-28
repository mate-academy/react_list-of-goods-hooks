import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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
  None,
  Alphabetically,
  ByLength,
}

function getPreparedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sortType === SortType.Alphabetically) {
    preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
  } else if (sortType === SortType.ByLength) {
    preparedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortType, isReversed);
  const isResetVisible = sortType !== SortType.None || isReversed;

  const reset = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortType === SortType.Alphabetically
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortType(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortType === SortType.ByLength
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortType(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => setIsReversed(currentValue => !currentValue)}
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
