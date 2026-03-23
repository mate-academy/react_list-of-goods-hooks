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
  initial = 'none',
  name = 'name',
  length = 'length',
}

function getPreparedGoods(
  goods: string[],
  reversed: boolean,
  sortField: SortType = SortType.initial,
) {
  const prepared = [...goods];

  if (sortField) {
    if (sortField === SortType.name) {
      prepared.sort((a, b) => a.localeCompare(b));
    }

    if (sortField === SortType.length) {
      prepared.sort((a, b) => a[sortField] - b[sortField]);
    }

    if (reversed) {
      prepared.reverse();
    }
  }

  return prepared;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.initial);
  const [reversed, setReversed] = useState(false);
  const sortedGoods = getPreparedGoods(goodsFromServer, reversed, sortType);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.name ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.length ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? 'active' : 'is-light'} `}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>
        {sortType !== SortType.initial || reversed ? (
          <button
            type="button"
            className={`button is-danger is-light`}
            onClick={() => {
              setSortType(SortType.initial);
              setReversed(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {sortedGoods.map(good => {
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
