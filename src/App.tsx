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
  ALPABET,
  LENGTH,
}

// Use this function in the render method
function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  // Not to mutate the original array
  const visibleGoods = [...goods];

  // Sort and reverse goods if needed
  visibleGoods.sort((a, b) => {
    switch (sortType) {
      case SortType.ALPABET:
        return a.localeCompare(b);
      case SortType.LENGTH:
        return a.length - b.length;
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
  const [isStarted, setIsStarted] = useState(true);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  return (
    <div className="App">
      {isStarted
        ? (
          <button
            type="button"
            onClick={() => setIsStarted(current => !current)}
          >
            Start
          </button>
        )
        : (
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
              onClick={() => setIsReversed(current => !current)}
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={() => {
                setSortType(SortType.NONE);
                setIsReversed(false);
              }}
            >
              Reset
            </button>

            <ul className="Goods">
              {visibleGoods.map(good => (
                <li
                  className="Goods__item"
                  key={good}
                >
                  {good}
                </li>
              ))}
            </ul>
          </>
        )}
    </div>
  );
};
