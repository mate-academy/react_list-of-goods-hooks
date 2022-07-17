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
  NONE = 'NONE',
  ALPABET = 'ALPABET',
  LENGTH = 'LENGTH',
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPABET:
      visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SortType.LENGTH:
      visibleGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isStarted, setStarted] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  return (
    <div className="App">
      {!isStarted
      && (
        <button
          className="App__button"
          type="button"
          onClick={() => {
            setStarted(!isStarted);
          }}
        >
          Start
        </button>
      )}

      {isStarted
      && (
        <>
          <div className="App__buttons">
            <button
              className="App__button"
              type="button"
              onClick={() => {
                setSortType(SortType.ALPABET);
              }}
            >
              Sort alphabetically
            </button>

            <button
              className="App__button"
              type="button"
              onClick={() => {
                setSortType(SortType.LENGTH);
              }}
            >
              Sort by length
            </button>

            <button
              className="App__button"
              type="button"
              onClick={() => {
                setReversed(!isReversed);
              }}
            >
              Reverse
            </button>

            <button
              className="App__button App__button--reset"
              type="button"
              onClick={() => {
                setReversed(false);
                setSortType(SortType.NONE);
              }}
            >
              Reset
            </button>
          </div>

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
