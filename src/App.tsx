/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import './App.css';
import cn from 'classnames';

const goodsFromServer = [
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
  ALPABET,
  LENGTH,
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  if (sortType === SortType.ALPABET) {
    visibleGoods.sort((g1, g2) => {
      return g1.localeCompare(g2);
    });
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((g1, g2) => {
      return g1.length - g2.length;
    });
  }

  if (isReversed) {
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const startApp = () => setIsStarted(true);
  const reverseList = () => setIsReversed(!isReversed);
  const sortByAlphabet = () => setSortType(SortType.ALPABET);
  const sortByLength = () => setSortType(SortType.LENGTH);
  const resetSortFilters = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const goods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="
      App
      level
      is-flex-direction-column
      "
    >
      {!isStarted
        ? (
          <button
            type="button"
            onClick={startApp}
            className="
              button
              is-outlined
              level-item
            "
          >
            Start
          </button>
        )

        : (
          <div className="level-item is-flex-direction-column">
            <div className="buttons">
              <button
                type="button"
                onClick={sortByAlphabet}
                className={cn(
                  'button',
                  { 'is-success': sortType === SortType.ALPABET },
                )}
              >
                Sort alphabetically
              </button>

              <button
                type="button"
                onClick={sortByLength}
                className={cn('button',
                  { 'is-success': sortType === SortType.LENGTH })}
              >
                Sort by length
              </button>

              <button
                type="button"
                onClick={reverseList}
                className={cn('button',
                  { 'is-success': isReversed })}
              >
                Reverse
              </button>

              <button
                type="button"
                onClick={resetSortFilters}
                className="button"
              >
                Reset
              </button>
            </div>

            <ul className="Goods">
              {goods.map(good => {
                return (
                  <li
                    className="Goods__item"
                    key={good}
                  >
                    {good}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
    </div>
  );
};
