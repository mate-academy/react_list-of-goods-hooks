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
function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.LENGTH:
      visibleGoods.sort((g1, g2) => g1.length - g2.length);
      break;
    case SortType.ALPABET:
      visibleGoods.sort((g1, g2) => g1.localeCompare(g2));
      break;
    case SortType.NONE:
    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const visibleGoods = getReorderedGoods(
    goodsFromServer, sortType, isReversed,
  );

  return (
    <div className="App">
      {!isStarted
        ? (
          <button
            type="button"
            onClick={() => setIsStarted(true)}
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
              onClick={() => setIsReversed(!isReversed)}
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
                <li key={good}>
                  {good}
                </li>
              ))}
            </ul>
          </>
        )}

    </div>
  );
};
