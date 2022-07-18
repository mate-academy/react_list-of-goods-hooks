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
  NONE,
  ALPHABET,
  LENGTH,
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((g1, g2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return g1.localeCompare(g2);
      case SortType.LENGTH:
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
  const [sortType, setSortType] = useState(SortType.NONE);
  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  const started = () => {
    setIsStarted(true);
  };

  const sortByAlphabetically = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="App">
      {!isStarted && (
        <button
          type="button"
          onClick={started}
        >
          Start
        </button>
      )}

      {isStarted && (
        <div>
          <button
            type="button"
            onClick={sortByAlphabetically}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            onClick={sortByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            onClick={reverse}
          >
            Reverse
          </button>

          <button
            type="button"
            onClick={reset}
          >
            Reset
          </button>

          <ul className="Goods">
            {visibleGoods.map(good => (
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
