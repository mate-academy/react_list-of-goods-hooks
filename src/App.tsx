import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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
  Alphabetically,
  Length,
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType | null,
  isReversed: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField === SortType.Alphabetically) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortField === SortType.Length) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | null>(null);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);
  const isDefault = sortField === null && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Alphabetically)}
          type="button"
          className={`button is-info ${
            sortField !== SortType.Alphabetically ? 'is-light' : ''
          }`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.Length)}
          type="button"
          className={`button is-success ${
            sortField !== SortType.Length ? 'is-light' : ''
          }`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(prev => !prev)}
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        {!isDefault && (
          <button
            onClick={() => {
              setSortField(null);
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger"
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
