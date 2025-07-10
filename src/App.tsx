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
  None = 'none',
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const getSortedGoods = () => {
    const sorted = [...goodsFromServer];

    if (sortOrder === SortType.Alphabet) {
      sorted.sort((a, b) => a.localeCompare(b));
    } else if (sortOrder === SortType.Length) {
      sorted.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sorted.reverse();
    }

    return sorted;
  };

  const handleSortAlphabetically = () => {
    setSortOrder(SortType.Alphabet);
  };

  const handleSortByLength = () => {
    setSortOrder(SortType.Length);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortOrder(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortOrder !== SortType.Alphabet ? 'is-light' : ''
          }`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortOrder !== SortType.Length ? 'is-light' : ''
          }`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortOrder !== SortType.None || isReversed) && (
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
        {getSortedGoods().map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
