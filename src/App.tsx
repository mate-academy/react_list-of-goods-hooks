/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import './App.scss';

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
  let visibleGoods = [...goods];

  if (sortType === SortType.ALPABET) {
    visibleGoods = visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods = visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

// type State = {
//   isStarted: boolean;
//   isReversed: boolean;
//   sortType: SortType;
// };

export const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const sortAlphaBetically = () => {
    setSortType(SortType.ALPABET);
  };

  const reset = () => {
    setIsStarted(false);
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const visible = () => {
    setIsStarted(!isStarted);
  };

  return (
    <div className="App">
      {!isStarted && (
        <button
          type="button"
          onClick={() => visible()}
          className="button button__start"
        >
          Start
        </button>
      )}
      {isStarted && (
        <>
          <ul className="Goods">
            {getReorderedGoods(goodsFromServer, sortType, isReversed).map(
              (good) => {
                return <li key={good}>{good}</li>;
              },
            )}
          </ul>

          <div className="Container">
            <button
              type="button"
              onClick={() => sortAlphaBetically()}
              className="button button__sort"
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={() => sortByLength()}
              className="button button__length"
            >
              Sort by length
            </button>

            <button
              type="button"
              onClick={() => reverse()}
              className="button button__reverse"
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={() => reset()}
              className="button button__reset"
            >
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  );
};
