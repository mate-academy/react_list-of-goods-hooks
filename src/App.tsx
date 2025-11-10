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

enum SortField {
  initial = 'none',
  alphabet = 'alpha',
  length = 'length',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>(SortField.initial);
  const [isReversed, setIsReversed] = useState(false);
  const prepared = [...goodsFromServer];

  if (sortField === SortField.alphabet) {
    prepared.sort((a, b) => a.localeCompare(b));
  } else if (sortField === SortField.length) {
    prepared.sort((a, b) => a.length - b.length || a.localeCompare(b));
  }

  if (isReversed) {
    prepared.reverse();
  }

  const handleSortAlpha = () => {
    setSortField(SortField.alphabet);
  };

  const handleSortLength = () => {
    setSortField(SortField.length);
  };

  const toggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const resetList = () => {
    setSortField(SortField.initial);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SortField.alphabet ? 'is-light' : ''}`}
          onClick={handleSortAlpha}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SortField.length ? 'is-light' : ''}`}
          onClick={handleSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {sortField !== SortField.initial || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetList}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {prepared.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
