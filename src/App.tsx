import React from 'react';
import { useState } from 'react';
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
  Default = 'Default',
  Alphabetically = 'Alphabetically',
  ByLength = 'ByLength',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [reversed, setReversed] = useState<boolean>(false);
  const goods = [...goodsFromServer];

  if (sortType === SortType.Alphabetically) {
    goods.sort((a, b) => a.localeCompare(b));
  }
  if (sortType === SortType.ByLength) {
    goods.sort((a, b) => a.length - b.length);
  }
  if (reversed) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === SortType.Alphabetically ? '' : 'is-light'
          }`}
          onClick={() => setSortType(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === SortType.ByLength ? '' : 'is-light'
          }`}
          onClick={() => setSortType(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {sortType !== SortType.Default || reversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.Default);
              setReversed(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
