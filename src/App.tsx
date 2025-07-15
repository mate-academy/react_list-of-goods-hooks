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

type Goods = string[];

enum SortType {
  Alph = 'alph',
  Length = 'length',
  None = '',
}

function arraysAreEqual(a: Goods, b: Goods) {
  return a.length === b.length && a.every((item, i) => item === b[i]);
}

function arraySorter(goods: Goods, sortMethod: SortType, isReversed: boolean) {
  const sortedGoods = [...goods];

  if (sortMethod) {
    sortedGoods.sort((a, b) => {
      switch (sortMethod) {
        case SortType.Alph:
          return a.localeCompare(b);
        case SortType.Length:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.None);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = arraySorter(
    goodsFromServer,
    sortField as SortType,
    isReversed,
  );

  const reset = () => {
    setSortField(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.Alph ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.Alph)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortType.Length ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {!arraysAreEqual(visibleGoods, goodsFromServer) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
