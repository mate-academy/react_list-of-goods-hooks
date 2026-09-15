import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  None = 'none',
  Alphabetical = 'alphabetical',
  Length = 'length',
}

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
  const [sortType, setSortType] = useState(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const isChanged = sortType !== SortType.None || isReversed;

  const visibleGoods = [...goodsFromServer];

  if (sortType === SortType.Alphabetical) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.Length) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed === true) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortType === SortType.Alphabetical
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortType(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortType === SortType.Length
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed === true
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.None);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
