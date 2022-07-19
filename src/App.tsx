import React, { useState } from 'react';
import './App.css';

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

export const App: React.FC = () => {
  const [isStarted, setStarted] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const visibleGoods = [...goodsFromServer];

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

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="App">
      {!isStarted
        ? (
          <button
            type="button"
            onClick={() => {
              setStarted(true);
            }}
          >
            Start
          </button>
        )
        : (
          <>
            <button
              type="button"
              onClick={() => {
                setReversed(false);
                setSortType(SortType.ALPABET);
              }}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={() => {
                setReversed(false);
                setSortType(SortType.LENGTH);
              }}
            >
              Sort by length
            </button>

            <button
              type="button"
              onClick={() => {
                setReversed(stateReversed => !stateReversed);
              }}
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={() => {
                setSortType(SortType.NONE);
                setReversed(false);
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
