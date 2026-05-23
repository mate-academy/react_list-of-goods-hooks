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

export enum SortType {
  Default = 'DEFAULT',
  Alphabetically = 'ALPHABETICALLY',
  ByLength = 'BYLENGTH',
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.Default);

  const visibleGoods = [...goodsFromServer];

  const [isReversed, setIsReversed] = useState(false);

  switch (sortBy) {
    case SortType.Alphabetically:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.ByLength:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
    case SortType.Default:
      break;
  }

  if (isReversed === true) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy !== SortType.Alphabetically ? 'is-light' : ''}`}
          onClick={() => setSortBy(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy !== SortType.ByLength ? 'is-light' : ''}`}
          onClick={() => setSortBy(SortType.ByLength)}
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

        {(sortBy !== SortType.Default || isReversed === true) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortType.Default);
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
