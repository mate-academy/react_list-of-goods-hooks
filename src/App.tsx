/* eslint-disable no-console */
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
  ALPHABET,
  LENGTH,
  NONE,
}

type ReorderOptions = {
  sortBy: SortType,
  isReverse: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortBy, isReverse }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((firstGood, secondGood) => {
    switch (sortBy) {
      case SortType.ALPHABET:
        return firstGood.localeCompare(secondGood);

      case SortType.LENGTH:
        return firstGood.length - secondGood.length;

      default:
        return 0;
    }
  });

  if (isReverse) {
    visibleGoods.reverse();
  }

  console.log(sortBy, isReverse);

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.NONE);
  const [isReverse, setIsReverse] = useState(false);

  const sortByAlphabet = () => {
    setSortBy(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSortBy(SortType.LENGTH);
  };

  const reverse = () => {
    setIsReverse(!isReverse);
  };

  const reset = () => {
    setSortBy(SortType.NONE);
    setIsReverse(false);
  };

  const reorderedGoods = getReorderedGoods(
    goodsFromServer,
    {
      sortBy,
      isReverse,
    },
  );

  const IsActiveResetButton = () => {
    if (isReverse === false && sortBy === SortType.NONE) {
      return false;
    }

    return true;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-light"
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={reverse}
        >
          Reverse
        </button>

        {IsActiveResetButton() && (
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
        <ul>
          {reorderedGoods.map(good => (
            <li key={good} data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
