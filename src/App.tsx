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
  None = 'none',
  Alphabet = 'abc',
  Length = 'length',
}

function getSortedGoods(sortType: SortType | null, isReversed: boolean) {
  const goods = [...goodsFromServer];

  if (sortType === SortType.Alphabet) {
    goods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.Length) {
    goods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    goods.reverse();
  }

  return goods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType | null>(null);
  const [isReversed, setIsReversed] = useState(false);

  const sortByAbc = () => {
    setSortType(SortType.Alphabet);
  };

  const sortByLength = () => {
    setSortType(SortType.Length);
  };

  const reverse = () => {
    setIsReversed(prev => !prev);
  };

  const reset = () => {
    setSortType(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-success ${
            sortType === SortType.Alphabet ? undefined : 'is-light'
          }`}
          onClick={sortByAbc}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === SortType.Length ? undefined : 'is-light'
          }`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-success ${isReversed ? undefined : 'is-light'}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
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
        {getSortedGoods(sortType, isReversed).map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
