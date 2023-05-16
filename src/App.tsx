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
  NONE,
  ALPHABET,
  LENGTH,
}

type IsReversed = boolean;
type SortBy = SortType;

export function getReorderedGoods(
  goods: string[],
  isReversed: IsReversed,
  sortBy: SortBy,
) {
  const visibleGoods = [...goods];

  let sortedGoods;

  switch (sortBy) {
    case 1:
      sortedGoods = [...visibleGoods].sort((a, b) => a.localeCompare(b));
      break;
    case 2:
      sortedGoods = [...visibleGoods].sort((a, b) => a.length - b.length);
      break;
    default:
      sortedGoods = [...visibleGoods];
      break;
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.debug(sortBy, isReversed);

  return sortedGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState(0);

  const goods = getReorderedGoods(goodsFromServer, isReversed, sortBy);

  const sortAlphabetically = () => {
    setSortBy(1);
  };

  const sortByLength = () => {
    setSortBy(2);
  };

  const reverseSort = () => {
    setIsReversed(!isReversed);
  };

  const resetSort = () => {
    setIsReversed(false);
    setSortBy(0);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortBy === 1
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortBy === 2
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed === true
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={reverseSort}
        >
          Reverse
        </button>

        {isReversed === false && sortBy === 0
          ? null
          : (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetSort}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        <ul>
          {goods.map(good => {
            return (
              <li data-cy="Good" key={good}>{good}</li>
            );
          })}
        </ul>
      </ul>
    </div>
  );
};
