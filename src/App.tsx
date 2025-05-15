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
  Default = 'default',
  Alphabetically = 'alphabetically',
  Length = 'length',
}

function sortAlphabetically(a: string, b: string) {
  return a.localeCompare(b);
}

function sortByLength(a: string, b: string) {
  return a.length - b.length;
}

function getPreparedGoods(
  goods: string[],
  sortField: string,
  isReversed: boolean,
) {
  let copiedGoods = [...goods];

  switch (sortField) {
    case SortType.Alphabetically:
      copiedGoods.sort(sortAlphabetically);
      break;
    case SortType.Length:
      copiedGoods.sort(sortByLength);
      break;
    default:
      copiedGoods = [...goods];
      break;
  }

  if (isReversed) {
    copiedGoods.reverse();
  }

  return copiedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const goods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  const isInitialOrder = sortField === SortType.Default && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.Alphabetically && !isReversed ? '' : 'is-light'}`}
          onClick={() => {
            setSortField(SortType.Alphabetically);
            setIsReversed(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortType.Length && !isReversed ? '' : 'is-light'}`}
          onClick={() => {
            setSortField(SortType.Length);
            setIsReversed(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => {
            setIsReversed(prev => !prev);
          }}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            type="button"
            className={`button is-danger ${isInitialOrder ? '' : 'is-light'}`}
            onClick={() => {
              setSortField(SortType.Default);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
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
