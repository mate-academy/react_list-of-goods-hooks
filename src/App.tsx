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

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

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
          className={`button is-info ${sortBy !== 'alpha' ? 'is-light' : ''}`}
          onClick={() => setSortBy('alpha')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy !== 'length' ? 'is-light' : ''}`}
          onClick={() => setSortBy('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortBy('');
              setIsReversed(false);
            }}
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
