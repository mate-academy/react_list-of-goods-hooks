import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

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
  alphabetically,
  byLength,
  reset,
}

type SortOptions = {
  sortField: SortType;
  isReverse: boolean;
};

function sortGoods(goods: string[], { sortField, isReverse }: SortOptions) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortField) {
      case SortType.alphabetically:
        return good1.localeCompare(good2);

      case SortType.byLength:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (sortField === SortType.reset) {
    return isReverse ? [...goods].reverse() : goods;
  }

  return isReverse ? [...preparedGoods].reverse() : preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SortType.reset);
  const [isReverse, setIsReverse] = useState(false);

  const sortedGoods = sortGoods(goodsFromServer, { sortField, isReverse });
  const isResetVisible = !(sortField === SortType.reset && !isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.alphabetically)}
          type="button"
          className={`button is-info ${sortField !== SortType.alphabetically && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.byLength)}
          type="button"
          className={`button is-success ${sortField !== SortType.byLength && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReverse(!isReverse)}
          type="button"
          className={`button is-warning ${!isReverse && 'is-light'}`}
        >
          Reverse
        </button>
        {isResetVisible && (
          <button
            onClick={() => {
              setSortField(SortType.reset);
              setIsReverse(false);
            }}
            type="button"
            className="button is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
