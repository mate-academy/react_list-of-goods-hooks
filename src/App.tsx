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
  ALPHABET,
  LENGTH,
}

export const App: React.FC = () => {
  const goods = [...goodsFromServer];

  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  goods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return good1.localeCompare(good2);

      case SortType.LENGTH:
        return good1.length - good2.length;

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
            <button
              type="button"
              onClick={() => setSortType(SortType.ALPHABET)}
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

            <button type="button" onClick={reset}>
              Reset
            </button>

            <ul className="Goods">
              {goods.map(good => (
                <li className="Goods__item" key={good}>
                  {good}
                </li>
              ))}
            </ul>
          </>
        )
        : (
          <button
            type="button"
            onClick={() => setIsStarted(!isStarted)}
          >
            Start
          </button>
        )}
    </div>
  );
};
