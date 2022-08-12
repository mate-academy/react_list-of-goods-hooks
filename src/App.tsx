import React, { useState } from 'react';
import './App.css';

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

  visibleGoods.sort((a, b) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return a.localeCompare(b);

      case SortType.LENGTH:
        return a.length - b.length;

      default:
        return 0;
    }
  });

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
}

// type State = {
//   isStarted: boolean,
//   isReversed: boolean,
//   sortType: SortType,
// };

export const App: React.FC = () => {
  const [isStarted, setStarted] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const startBtn = () => {
    setStarted(true);
  };

  const sortByLengthBtn = () => {
    setSortType(SortType.LENGTH);
  };

  const sortByAlphabetBtn = () => {
    setSortType(SortType.ALPHABET);
  };

  const reverseBtn = () => {
    setReversed(!isReversed);
  };

  const resetBtn = () => {
    setSortType(SortType.NONE);
    setReversed(false);
  };

  const goods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  return (
    <div className="App">
      {!isStarted && (
        <button
          type="button"
          className="Start button is-link"
          onClick={startBtn}
        >
          Start
        </button>
      )}

      {isStarted && (
        <>
          <div className="Container">
            <button
              type="button"
              className="btn button is-primary"
              onClick={sortByAlphabetBtn}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className="btn button is-primary"
              onClick={sortByLengthBtn}
            >
              Sort by length
            </button>

            <button
              type="button"
              className="btn button is-primary"
              onClick={reverseBtn}
            >
              Reverse
            </button>

            <button
              type="button"
              className="btn button is-primary"
              onClick={resetBtn}
            >
              Reset
            </button>
          </div>

          <ul className="Goods">
            {
              goods.map(good => (
                <li key={good} className="Goods__item">{good}</li>
              ))
            }
          </ul>

        </>
      )}
    </div>
  );
};
