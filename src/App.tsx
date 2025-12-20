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
  None,
  Alphabetically,
  Length,
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField === SortType.Alphabetically) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortField === SortType.Length) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  const isDefault = sortField === SortType.None && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.Alphabetically)}
          className={`button is-info ${
            sortField !== SortType.Alphabetically ? 'is-light' : ''
          }`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.Length)}
          className={`button is-success ${
            sortField !== SortType.Length ? 'is-light' : ''
          }`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(prev => !prev)}
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        {!isDefault && (
          <button
            type="button"
            onClick={() => {
              setSortField(SortType.None);
              setIsReversed(false);
            }}
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
