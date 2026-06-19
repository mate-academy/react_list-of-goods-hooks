import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export enum SortType {
  Default = 'default',
  Alphabetically = 'alphabetically',
  ByLength = 'byLength',
}

export const goodsFromServer: string[] = [
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

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  let visibleGoods = [...goodsFromServer];

  if (sortType === SortType.Alphabetically) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortType === SortType.ByLength) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  const handleSortAlphabetically = () => {
    setSortType(SortType.Alphabetically);
  };

  const handleSortByLength = () => {
    setSortType(SortType.ByLength);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  const isModified = sortType !== SortType.Default || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabetically ? 'is-active' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.ByLength ? 'is-active' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? 'is-active' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
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
