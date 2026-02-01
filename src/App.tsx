import React, { useState } from 'react';
import cs from 'clsx';

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
  Alphabet = 'alphabet',
  Length = 'length',
}

type SortParams = {
  sortBy?: SortType;
  isReversed: boolean;
};

const comparators: Record<SortType, (a: string, b: string) => number> = {
  [SortType.Alphabet]: (a, b) => a.localeCompare(b),
  [SortType.Length]: (a, b) => a.length - b.length,
};

function sortList(list: string[], { sortBy, isReversed }: SortParams) {
  const newList = [...list];

  if (sortBy) {
    newList.sort(comparators[sortBy]);
  }

  return isReversed ? newList.reverse() : newList;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>();
  const [isReversed, setIsReversed] = useState(false);

  const goodsList = sortList(goodsFromServer, { sortBy, isReversed });

  const handleReset = () => {
    setIsReversed(false);
    setSortBy(undefined);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cs('button is-info', {
            'is-light': sortBy !== SortType.Alphabet,
          })}
          onClick={() => setSortBy(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cs('button is-success', {
            'is-light': sortBy !== SortType.Length,
          })}
          onClick={() => setSortBy(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cs('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(r => !r)}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
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
        {goodsList.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
