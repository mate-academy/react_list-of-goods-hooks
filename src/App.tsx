/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
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

// Use this function in the render method
function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case (SortType.ALPABET):
      visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case (SortType.LENGTH):
      visibleGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [isStarted, setStart] = useState(false);
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const resetOrder = () => {
    setReverse(false);
    setSortType(SortType.NONE);
  };

  const visibleGoods
    = getReorderedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="App">
      {isStarted
        ? (
          <>
            <button
              type="button"
              onClick={() => setSortType(SortType.ALPABET)}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={() => setSortType(SortType.LENGTH)}
            >
              Sort by length
            </button>

            <button
              type="button"
              onClick={() => setReverse(current => !current)}
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={() => resetOrder()}
            >
              Reset
            </button>

            <ul className="Goods">
              {visibleGoods.map(
                good => <li className="Goods__item" key={good}>{good}</li>,
              )}
            </ul>
          </>
        )
        : (
          <button
            type="button"
            onClick={() => setStart(true)}
          >
            Start
          </button>
        )}
    </div>
  );
};
