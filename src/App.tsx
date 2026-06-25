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
  None = '',
  Alpha = 'alpha',
  Length = 'length',
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const handleSortAlpha = () => setSortBy(SortType.Alpha);
  const handleSortLength = () => setSortBy(SortType.Length);
  const handleToggleReverse = () => setIsReversed(prevs => !prevs);

  const handleReset = () => {
    setSortBy(SortType.None);
    setIsReversed(false);
  };

  const visibleGoods = [...goodsFromServer];

  if (sortBy === 'alpha') {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortBy === 'length') {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  const isChanged = sortBy !== '' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy !== SortType.Alpha ? 'is-light' : ''}`}
          onClick={handleSortAlpha}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy !== SortType.Length ? 'is-light' : ''}`}
          onClick={handleSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={handleToggleReverse}
        >
          Reverse
        </button>

        {isChanged && (
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
