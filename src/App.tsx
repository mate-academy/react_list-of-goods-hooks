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

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPABET:
        return good1.localeCompare(good2);
      case SortType.LENGTH:
        return good1.length - good2.length;
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
