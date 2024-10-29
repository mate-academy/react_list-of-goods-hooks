import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

enum SortType {
  None = '',
  Alphabetical = 'alphabetical',
  Length = 'length',
  Reverse = 'reverse',
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

export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState<string[]>(goodsFromServer);
  const [sortOrder, setSortOrder] = useState<SortType>(SortType.None);

  const sortAlphabetically = () => {
    setVisibleGoods(
      [...visibleGoods].sort((good1, good2) => good1.localeCompare(good2)),
    );
    setSortOrder(SortType.Alphabetical);
  };

  const sortByItemLength = () => {
    setVisibleGoods([...visibleGoods].sort((a, b) => a.length - b.length));
    setSortOrder(SortType.Length);
  };

  const reverseGoodsList = () => {
    setVisibleGoods([...visibleGoods].reverse());
    setSortOrder(SortType.Reverse);
  };

  const resetToOriginalOrder = () => {
    setVisibleGoods([...goodsFromServer]);
    setSortOrder(SortType.None);
  };

  const isInOriginalOrder =
    JSON.stringify(visibleGoods) === JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortOrder === SortType.Alphabetical ? '' : 'is-light'
          }`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortOrder === SortType.Length ? '' : 'is-light'
          }`}
          onClick={sortByItemLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${
            sortOrder === SortType.Reverse ? '' : 'is-light'
          }`}
          onClick={reverseGoodsList}
        >
          Reverse
        </button>

        {!isInOriginalOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetToOriginalOrder}
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
