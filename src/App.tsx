import React, { useState } from 'react';
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
  Alphabetically,
  Length,
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType | null>(null);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = [...goodsFromServer];

  if (sortType === SortType.Alphabetically) {
    visibleGoods.sort((goodA, goodB) => goodA.localeCompare(goodB));
  }

  if (sortType === SortType.Length) {
    visibleGoods.sort((goodA, goodB) => goodA.length - goodB.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  const isChanged = sortType !== null || isReversed;

  const reset = () => {
    setSortType(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === SortType.Alphabetically ? '' : 'is-light'
          }`}
          onClick={() => setSortType(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === SortType.Length ? '' : 'is-light'
          }`}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${
            isReversed ? '' : 'is-light'
          }`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isChanged && (
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
