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
  none,
  alphabet,
  length,
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((g1, g2) => {
    switch (sortType) {
      case SortType.alphabet:
        return g1.localeCompare(g2);
      case SortType.length:
        return g1.length - g2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.none);

  return (
    <div className="App">
      {!isStarted && (
        <button
          type="button"
          onClick={() => {
            setIsStarted(true);
          }}
        >
          Start
        </button>
      )}

      {isStarted && (
        <div>
          <button
            type="button"
            onClick={() => {
              setSortType(SortType.alphabet);
            }}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            onClick={() => {
              setSortType(SortType.length);
            }}
          >
            Sort by length
          </button>

          <button
            type="button"
            onClick={() => {
              setIsReversed(!isReversed);
            }}
          >
            Reverse
          </button>

          <button
            type="button"
            onClick={() => {
              setIsReversed(false);
              setSortType(SortType.none);
            }}
          >
            Reset
          </button>

          <ul className="Goods">
            {getReorderedGoods(
              goodsFromServer,
              sortType,
              isReversed,
            ).map(good => (
              <li className="Goods__item" key={good}>
                {good}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
