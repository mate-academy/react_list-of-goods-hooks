/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import './App.css';

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

  if (sortType !== SortType.NONE) {
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

  const start = () => setIsStarted(true);
  const reverse = () => setIsReversed(!isReversed);
  const alphabet = () => setSortType(SortType.ALPABET);
  const length = () => setSortType(SortType.LENGTH);
  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const goods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="App">
      {!isStarted
        ? (
          <button
            type="button"
            onClick={start}
          >
            Start
          </button>
        )

        : (
          <>
            <button
              type="button"
              onClick={alphabet}
            >
              Sort alphabetically
            </button>

            <button type="button" onClick={length}>
              Sort by length
            </button>

            <button type="button" onClick={reverse}>
              Reverse
            </button>

            <button type="button" onClick={reset}>
              Reset
            </button>

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
          </>
        )}
    </div>
  );
};
