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
  Alphabetically = 'alphabetically',
  Length = 'length',
  None = '',
}

enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

export const App: React.FC = () => {
  const [sortedBy, setSortedBy] = useState<SortType>(SortType.None);

  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.Ascending,
  );

  const goods = [...goodsFromServer];

  if (sortedBy === SortType.Alphabetically) {
    goods.sort();
  }

  if (sortedBy === SortType.Length) {
    goods.sort((a, b) => a.length - b.length);
  }

  if (sortDirection === SortDirection.Descending) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortedBy !== SortType.Alphabetically ? 'is-light' : ''}`}
          onClick={() => {
            setSortedBy(SortType.Alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortedBy !== SortType.Length ? 'is-light' : ''}`}
          onClick={() => {
            setSortedBy(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortDirection !== SortDirection.Descending ? 'is-light' : ''}`}
          onClick={() => {
            setSortDirection(
              sortDirection === SortDirection.Ascending
                ? SortDirection.Descending
                : SortDirection.Ascending,
            );
          }}
        >
          Reverse
        </button>
        {(sortedBy !== SortType.None ||
          sortDirection === SortDirection.Descending) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortedBy(SortType.None);
              setSortDirection(SortDirection.Ascending);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
