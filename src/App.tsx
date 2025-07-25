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

enum SortField {
  alphabet = 'alphabet',
  length = 'length',
}

function getSortedGoods(
  listOfGoods: string[],
  sortField: SortField,
  reverse: boolean,
): string[] {
  const sortedGoods: string[] = [...listOfGoods];

  if (sortField) {
    sortedGoods.sort((goods1, goods2) => {
      switch (sortField) {
        case SortField.alphabet:
          return goods1.localeCompare(goods2);
        case SortField.length:
          return goods1.length - goods2.length;
      }
    });
  }

  if (reverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField | ''>('');
  const [isReverse, setReverse] = useState(false);

  const handleSortAlphabetically = () => {
    setSortField(SortField.alphabet);
  };

  const handleSortByLength = () => {
    setSortField(SortField.length);
  };

  const handleReverse = () => {
    setReverse(prev => !prev);
  };

  const handleReset = () => {
    setSortField('');
    setReverse(false);
  };

  const visibleGoods = sortField
    ? getSortedGoods(goodsFromServer, sortField, isReverse)
    : isReverse
      ? [...goodsFromServer].reverse()
      : goodsFromServer;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortField.alphabet ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortField === SortField.length ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${isReverse === true ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>
        {(sortField || isReverse) && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
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
