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
  None = 'NONE',
  Alphabetically = 'ALPHABET',
  ByLength = 'LENGTH',
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const getSortedGoods = (): string[] => {
    const result = [...goodsFromServer];

    if (sortBy === SortType.Alphabetically) {
      result.sort((a, b) => a.localeCompare(b));
    } else if (sortBy === SortType.ByLength) {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  };

  const handleSort = (method: SortType) => {
    setSortBy(current => {
      if (current === method) {
        setIsReversed(false);

        return SortType.None;
      }

      return method;
    });
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortBy(SortType.None);
    setIsReversed(false);
  };

  const displayedGoods = getSortedGoods();
  const isResetVisible = sortBy !== SortType.None || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => handleSort(SortType.Alphabetically)}
          className={`button ${sortBy === SortType.Alphabetically ? 'is-info' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => handleSort(SortType.ByLength)}
          className={`button ${sortBy === SortType.ByLength ? 'is-success' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={`button ${isReversed ? 'is-warning' : 'is-light'}`}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {displayedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
