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
  ALPHA,
  LENGTH,
}

export const App: React.FC = () => {
  const goods = [...goodsFromServer];
  const [isStarted, switchStart] = useState(false);
  const [sortBy, setSortBy] = useState(SortType.NONE);
  const [isReversed, switchReverse] = useState(false);
  const reset = () => {
    switchReverse(false);
    setSortBy(SortType.NONE);
  };

  goods.sort((g1, g2) => {
    switch (sortBy) {
      case SortType.ALPHA:
        return g1.localeCompare(g2);

      case SortType.LENGTH:
        return g1.length - g2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    goods.reverse();
  }

  return (
    <div className="App">
      {isStarted
        ? (
          <>
            <button type="button" onClick={() => setSortBy(SortType.ALPHA)}>
              Sort alphabetically
            </button>

            <button type="button" onClick={() => setSortBy(SortType.LENGTH)}>
              Sort by length
            </button>

            <button type="button" onClick={() => switchReverse(!isReversed)}>
              Reverse
            </button>

            <button type="button" onClick={reset}>
              Reset
            </button>

            <ul className="Goods">
              {goods.map(good => (
                <li className="Goods__item" key={good}>{good}</li>
              ))}
            </ul>
          </>
        )
        : (
          <button type="button" onClick={() => switchStart(!isStarted)}>
            Start
          </button>
        )}
    </div>
  );
};
