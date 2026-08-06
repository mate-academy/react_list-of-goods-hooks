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
  Default = '',
  Alphabetical = 'alphabetical',
  Length = 'length',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = [...goodsFromServer];

  if (sortType === SortType.Alphabetical) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.Length) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  const handleSortAlphabetical = () => {
    setSortType(SortType.Alphabetical);
  };

  const handleSortByLength = () => {
    setSortType(SortType.Length);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSortAlphabetical}
          type="button"
          className={`button is-info ${sortType !== SortType.Alphabetical ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSortByLength}
          type="button"
          className={`button is-success ${sortType !== SortType.Length ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortType !== SortType.Default || isReversed) && (
          <button
            onClick={handleReset}
            type="button"
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
