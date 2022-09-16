import React, { useState } from 'react';
import classNames from 'classnames';
import { GoodsList } from './GoodsList';
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

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const sortedGoods = [...goods];

  sortedGoods.sort((goodA, goodB) => {
    switch (sortType) {
      case (SortType.ALPHABET):
        return goodA.localeCompare(goodB);

      case (SortType.LENGTH):
        return goodA.length - goodB.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReverse] = useState(false);
  const [sortType, setType] = useState(SortType.NONE);

  const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });

  const handleReverse = () => {
    setReverse(state => !state);
  };

  const handleSortByAlph = () => {
    setType(SortType.ALPHABET);
  };

  const handleSortByLength = () => {
    setType(SortType.LENGTH);
  };

  const handleReset = () => {
    setType(SortType.NONE);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={handleSortByAlph}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': isReversed === false },
          )}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed !== false)
        && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={goods} />
    </div>
  );
};
