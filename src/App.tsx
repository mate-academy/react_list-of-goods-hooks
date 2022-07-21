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
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);

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
              setIsStarted(true);
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
                setIsReversed(false);
                setSortType(SortType.ALPABET);
              }}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={() => {
                setIsReversed(false);
                setSortType(SortType.LENGTH);
              }}
            >
              Sort by length
            </button>

            <button
              type="button"
              onClick={() => {
                setIsReversed(stateReversed => !stateReversed);
              }}
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={() => {
                setSortType(SortType.NONE);
                setIsReversed(false);
                setVisibleGoods([...goodsFromServer]);
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
