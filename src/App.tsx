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
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  NONE = '',
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const processedSortGoods = [...goodsFromServer];

  if (sortBy === SortType.ALPHABET) {
    processedSortGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortBy === SortType.LENGTH) {
    processedSortGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed === true) {
    processedSortGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={() => {
            setSortBy(SortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortBy(SortType.LENGTH)}
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

        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortType.NONE);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {processedSortGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
