import React, { useState } from 'react';
import classNames from 'classnames';
import { GoodsList } from './components/GoodsList';

import { goodsFromServer } from './data/GoodsFromServer';

import 'bulma/css/bulma.css';

import './App.scss';

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

interface ReorderOptions {
  isReversed: boolean;
  sortType: SortType;
}

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((previousGood, currentGood) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return previousGood.localeCompare(currentGood);

      case SortType.LENGTH:
        return previousGood.length - currentGood.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const isResetButton = sortType !== SortType.NONE || isReversed;
  const reorderedGoods = getReorderedGoods(
    goodsFromServer,
    {
      sortType,
      isReversed,
    },
  );

  const handleSortByABC = () => setSortType(SortType.ALPHABET);
  const handleSortByLength = () => setSortType(SortType.LENGTH);
  const handleReverse = () => setIsReversed(!isReversed);
  const resetListItems = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            classNames(
              'button',
              'is-info',
              {
                'is-light': sortType !== SortType.ALPHABET,
              },
            )
          }
          onClick={handleSortByABC}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            classNames(
              'button',
              'is-success',
              {
                'is-light': sortType !== SortType.LENGTH,
              },
            )
          }
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            classNames(
              'button',
              'is-warning',
              {
                'is-light': !isReversed,
              },
            )
          }
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetListItems}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={reorderedGoods} />
    </div>
  );
};
