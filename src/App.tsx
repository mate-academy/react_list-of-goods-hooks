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
  ALPHABET,
  LENGTH,
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((el1, el2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return el1.localeCompare(el2);

      case SortType.LENGTH:
        return el1.length - el2.length;

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
  const [isStarted, setStarted] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [sortType, serSortType] = useState(SortType.NONE);

  const start = () => {
    setStarted(true);
  };

  const sortByLength = () => {
    serSortType(SortType.ALPHABET);
  };

  const sortByAlphabet = () => {
    serSortType(SortType.LENGTH);
  };

  const reverse = () => {
    setReversed(!isReversed);
  };

  const reset = () => {
    serSortType(SortType.NONE);
    setReversed(false);
  };

  const goods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="App">
      {!isStarted && (
        <button
          type="button"
          onClick={start}
          className="button is-success is-rounded is-size-2"
        >
          Start
        </button>
      )}

      {isStarted && (
        <>
          <div>
            <div
              className="columns"
            >
              <button
                type="button"
                className="column button is-info is-outlined"
                onClick={sortByAlphabet}
              >
                Sort alphabeticaly
              </button>
              <button
                type="button"
                className="column button is-info is-outlined"
                onClick={sortByLength}
              >
                Sort by length
              </button>
              <button
                type="button"
                className="column button is-info is-outlined"
                onClick={reverse}
              >
                Reverse
              </button>
              <button
                type="button"
                className="column button is-info is-outlined"
                onClick={reset}
              >
                Reset
              </button>
            </div>

            <ul>
              {goods.map(good => (
                <li>
                  {good}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
