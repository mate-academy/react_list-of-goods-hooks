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
  Unsorted = 'NONE',
  Alphabet = 'ALPHA',
  StringLength = 'LENGTH',
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.Unsorted);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const isAlphaActive = sortBy === SortType.Alphabet;
  const isLengthActive = sortBy === SortType.StringLength;
  const isOriginalOrder = sortBy === SortType.Unsorted && !isReversed;

  const visibleGoods: string[] = [...goodsFromServer];

  if (isAlphaActive) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (isLengthActive) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) visibleGoods.reverse();

  const handleSortAlpha = () => setSortBy(SortType.Alphabet);
  const handleSortLength = () => setSortBy(SortType.StringLength);
  const handleReverse = () => setIsReversed(prev => !prev);
  const handleReset = (): void => {
    setSortBy(SortType.Unsorted);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isAlphaActive ? '' : 'is-light'}`}
          onClick={handleSortAlpha}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isLengthActive ? '' : 'is-light'}`}
          onClick={handleSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
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
        {visibleGoods.map((good: string) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
