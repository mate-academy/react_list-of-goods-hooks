import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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

export enum SortType {
  None = 'none',
  Alphabetically = 'alpha',
  ByLength = 'length',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [initialGoods] = useState<string[]>(goodsFromServer);

  const list = [...initialGoods];

  const handleSortAlphabetically = (): void => {
    setSortType(SortType.Alphabetically);
  };

  const handleSortByLength = (): void => {
    setSortType(SortType.ByLength);
  };

  const handleToggleReverse = (): void => {
    setIsReversed(prev => !prev);
  };

  const handleReset = (): void => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  if (sortType === 'alpha') {
    list.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortType === 'length') {
    list.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    list.reverse();
  }

  const isChanged = sortType !== SortType.None || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={handleSortAlphabetically}
          className={`button is-info ${sortType === SortType.Alphabetically ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={handleSortByLength}
          className={`button is-success ${sortType === SortType.ByLength ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleToggleReverse}
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {list.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
