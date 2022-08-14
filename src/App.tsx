import React, { useState } from 'react';
import './App.css';

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
    visibleGoods.sort((g1, g2) => {
      switch (sortType) {
        case SortType.ALPABET:
          return g1.localeCompare(g2);
        case SortType.LENGTH:
          return g1.length - g2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const goodsFromServer: string[] = [
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

export const App: React.FC = () => {
  const [isStarted, setIsStarter] = useState(false);
  const [isReversed, setIsReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const start = () => setIsStarter(true);

  const sortByAlphabet = () => {
    setSortType(SortType.ALPABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reset = () => {
    setSortType(SortType.NONE);
    setIsReverse(false);
  };

  const reverse = () => {
    setIsReverse(!isReversed);
  };

  const goods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="App">
      {isStarted === false
        ? (
          <button
            type="button"
            onClick={start}
            className="start-button button"
          >
            Start
          </button>
        )
        : (
          <>
            <div className="buttons">
              <button
                type="button"
                onClick={sortByAlphabet}
                className="button"
              >
                Sort alphabetically
              </button>

              <button
                type="button"
                onClick={sortByLength}
                className="button"
              >
                Sort by length
              </button>

              <button
                type="button"
                onClick={reverse}
                className="button"
              >
                Reverse
              </button>

              <button
                type="button"
                onClick={reset}
                className="reset-button button"
              >
                Reset
              </button>
            </div>

            <ul className="Goods">
              {goods.map(good => (
                <li className="Goods__item">{good}</li>
              ))}
            </ul>
          </>
        )}
    </div>
  );
};
