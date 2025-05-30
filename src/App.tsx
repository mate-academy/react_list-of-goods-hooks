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

export enum SortType {
  Alphabetical = 'Alphabetical',
  Length = 'Length',
  None = 'None',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.None);
  const [reversed, setReversed] = useState(false);
  const [sorted, setSorted] = useState(false);
  let sortedGoods = [...goodsFromServer].sort((a, b) => {
    if (sortField === SortType.Alphabetical) {
      return a.localeCompare(b);
    } else if (sortField === SortType.Length) {
      return a.length - b.length;
    }

    return 0;
  });

  if (reversed) {
    sortedGoods = sortedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SortType.Alphabetical
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortField(SortType.Alphabetical);
            setSorted(true);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SortType.Length
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortField(SortType.Length);
            setSorted(true);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reversed ? 'button is-info' : 'button is-info is-light'}
          onClick={() => {
            setReversed(!reversed);
            if (sortField === SortType.None) {
              setSorted(!sorted);
            }
          }}
        >
          Reverse
        </button>

        {sorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.None);
              setReversed(false);
              setSorted(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {sortedGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
