import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  if (sortType !== SortType.NONE) {
    visibleGoods.sort((goodA, goodB) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return goodA.localeCompare(goodB);

        case SortType.LENGTH:
          return goodA.length - goodB.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const handleSortAlphabetically = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleSortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleReversed = () => {
    setReverse(!isReversed);
  };

  const handleReset = () => {
    setReverse(false);
    setSortType(SortType.NONE);
  };

  const sortAlphabetCN = cn('button is-info',
    { 'is-light': sortType !== SortType.ALPHABET });

  const sortBylengthCN = cn('button is-success',
    { 'is-light': sortType !== SortType.LENGTH });

  const reverseCN = cn('button is-warning', { 'is-light': !isReversed });

  const resetBtnCondition = sortType !== SortType.NONE || isReversed;

  const reorderedGoods = getReorderedGoods(
    goodsFromServer, { sortType, isReversed },
  );

  return (
    <div className="section content">
      <h1 className="title is-1">React List of Goods Hooks</h1>
      <div className="wrapper">
        <div className="buttons">
          <button
            type="button"
            className={sortAlphabetCN}
            onClick={handleSortAlphabetically}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={sortBylengthCN}
            onClick={handleSortByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={reverseCN}
            onClick={handleReversed}
          >
            Reverse
          </button>
          {resetBtnCondition && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={handleReset}
            >
              Reset
            </button>
          )}
        </div>
        <ul>
          {reorderedGoods
            .map(good => (
              <li
                data-cy="Good"
                key={good}
              >
                {good}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
