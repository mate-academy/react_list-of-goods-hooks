import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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
  None = 'none',
  Alphabetical = 'alphabetical',
  Length = 'length',
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const displayedGoods: string[] = [...goodsFromServer];

  if (sortBy === SortType.Alphabetical) {
    displayedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortBy === SortType.Length) {
    displayedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    displayedGoods.reverse();
  }

  const isModified: boolean = sortBy !== SortType.None || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy !== SortType.Alphabetical ? 'is-light' : ''}`}
          onClick={() => setSortBy(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy !== SortType.Length ? 'is-light' : ''}`}
          onClick={() => setSortBy(SortType.Length)}
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

        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortType.None);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {displayedGoods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
