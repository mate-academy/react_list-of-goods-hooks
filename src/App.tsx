import React, { useState, useMemo } from 'react';
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
type Good = string;

enum SortType {
  Default = 'none',
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const handleSortByAlphabet = () => {
    setSortType(SortType.Alphabet);
    setIsReversed(false);
  };

  const handleSortByLength = () => {
    setSortType(SortType.Length);
    setIsReversed(false);
  };

  const handleReverse = () => setIsReversed(prev => !prev);
  const handleReset = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  const isResetVisible = sortType !== SortType.Default || isReversed;
  const isAlphabetActive = sortType === SortType.Alphabet;
  const isLengthActive = sortType === SortType.Length;
  const visibleGoods = useMemo<string[]>(() => {
    const sorted = [...goodsFromServer];

    if (sortType === SortType.Alphabet) {
      sorted.sort((a, b) => a.localeCompare(b));
    }

    if (sortType === SortType.Length) {
      sorted.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sorted.reverse();
    }

    return sorted;
  }, [sortType, isReversed]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${!isAlphabetActive ? 'is-light' : ''}`}
          onClick={handleSortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${!isLengthActive ? 'is-light' : ''}`}
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

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((g: Good) => (
          <li key={g} data-cy="Good">
            {g}
          </li>
        ))}
      </ul>
    </div>
  );
};
