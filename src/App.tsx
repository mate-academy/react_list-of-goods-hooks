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
  name = 'name',
  length = 'length',
}

function getPreparedGoods(
  goods: string[],
  reversed: boolean,
  sortField: SortField = SortField.initial,
) {
  const prepared = [...goods];

  if (sortField) {
    if (sortField === SortField.name) {
      prepared.sort((a, b) => a.localeCompare(b));
    }

    if (sortField === SortField.length) {
      prepared.sort((a, b) => a[sortField] - b[sortField]);
    }

    if (reversed) {
      prepared.reverse();
    }

    return prepared;
  }
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>(SortField.initial);
  const [reversed, setReversed] = useState(false);
  const sortedGoods = getPreparedGoods(goodsFromServer, reversed, sortField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SortField.name && 'is-light'}`}
          onClick={() => setSortField(SortField.name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SortField.length && 'is-light'}`}
          onClick={() => setSortField(SortField.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reversed && 'is-light'} active: reversed`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>
        {sortField !== SortField.initial || reversed ? (
          <button
            type="button"
            className={`button is-danger is-light`}
            onClick={() => {
              setSortField(SortField.initial);
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
