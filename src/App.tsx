import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

type Goods = string[];

enum SortType {
  No,
  Alphabeth,
  Length,
}

const goodsFromServer = [
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

function getPreparedGoods(goods: Goods, sortBy: SortType): Goods {
  if (sortBy === SortType.Alphabeth) {
    return [...goods].sort((good1, good2) => {
      return good1.localeCompare(good2);
    });
  }

  if (sortBy === SortType.Length) {
    return [...goods].sort((good1, good2) => good1.length - good2.length);
  }

  return [...goods];
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.No);
  const [isReversed, setIsReversed] = useState(false);
  let preparedGoods = getPreparedGoods(goodsFromServer, sortField);

  preparedGoods = isReversed ? preparedGoods.toReversed() : preparedGoods;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SortType.Alphabeth
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortField(SortType.Alphabeth)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SortType.Length
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.No);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
