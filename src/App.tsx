import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Alphabetically,
  Length,
}

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

function getGoods(
  goods: string[],
  sortField: SortType | '',
  reverse: boolean,
): string[] {
  const newGoods = [...goods];

  if (sortField !== '') {
    newGoods.sort((a, b) => {
      switch (sortField) {
        case SortType.Alphabetically:
          return a.localeCompare(b);

        case SortType.Length:
          return Number(a.length) - Number(b.length);

        default:
          return 0;
      }
    });
  }

  return reverse ? newGoods.reverse() : newGoods;
}

export const App: React.FC = () => {
  const [reverse, setReverse] = useState(false);
  const [sortValue, setSortValue] = useState(-1);

  const updatedGoods = getGoods(goodsFromServer, sortValue, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortValue === SortType.Alphabetically ? '' : 'is-light'}`}
          onClick={() => {
            setSortValue(SortType.Alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortValue === SortType.Length ? '' : 'is-light'}`}
          onClick={() => {
            setSortValue(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
          onClick={() => {
            setReverse(!reverse);
          }}
        >
          Reverse
        </button>

        {(sortValue !== -1 || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortValue(-1);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {updatedGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
