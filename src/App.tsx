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
    case SortType.ALPABET:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      visibleGoods.sort((a, b) => a.length - b.length);
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
  const [isStarted, setStarted] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setReversed] = useState(false);

  const visibleGoods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="App block notification is-white">
      {isStarted
        ? (
          <>
            <button
              type="button"
              onClick={() => setSortType(SortType.ALPABET)}
              className="button is-link is-outlined mr-3"
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={() => setSortType(SortType.LENGTH)}
              className="button is-link is-outlined mr-3"
            >
              Sort by length
            </button>

            <button
              type="button"
              onClick={() => setReversed(prevState => !prevState)}
              className="button is-link is-outlined mr-3"
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={() => setSortType(SortType.NONE)}
              className="button is-info is-outlined"
            >
              Reset
            </button>

            <ul className="Goods">
              {visibleGoods.map(good => {
                return (
                  <li key={good} className="Goods__item">{good}</li>
                );
              })}
            </ul>
          </>
        )
        : (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="button is-info"
          >
            Start
          </button>
        )}
    </div>
  );
};
