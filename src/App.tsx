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
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.Default);

  const [isReversed, setIsReversed] = useState(false);

  const handleAlphabetSort = () => {
    setSortBy(SortType.Alphabet);
  };

  const handleLengthSort = () => {
    setSortBy(SortType.Length);
  };

  const handleReverseToggle = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortBy(SortType.Default);
    setIsReversed(false);
  };

  const getSortedGoods = () => {
    const sorted = [...goodsFromServer];

    if (sortBy === SortType.Alphabet) {
      sorted.sort((a, b) => a.localeCompare(b));
    } else if (sortBy === SortType.Length) {
      sorted.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sorted.reverse();
    }

    return sorted;
  };

  const visibleGoods = getSortedGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortBy === SortType.Alphabet
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={handleAlphabetSort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortBy === SortType.Length
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={handleLengthSort}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={handleReverseToggle}
        >
          Reverse
        </button>

        {(sortBy !== SortType.Default || isReversed) && (
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
