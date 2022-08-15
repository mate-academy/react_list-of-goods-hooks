import { useState } from 'react';

import './App.scss';

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
  NONE = 'None',
  ALPHABET = 'Alphabet',
  LENGTH = 'Length',
}

function getReorderedGoods(
  goods: string[],
  sortBy: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((goodA, goodB) => {
    switch (sortBy) {
      case SortType.ALPHABET:
        return goodA.localeCompare(goodB);
      case SortType.LENGTH:
        return goodA.length - goodB.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState(SortType.NONE);
  const [isStarted, setIsStarted] = useState(true);

  const reset = () => {
    setIsReversed(false);
    setSortBy(SortType.NONE);
  };

  const sorted = getReorderedGoods(
    goodsFromServer,
    sortBy,
    isReversed,
  );

  return (
    <div className="App">
      <h1 className="App__title">
        List of goods
      </h1>
      {isStarted && (
        <button
          type="button"
          className="button"
          onClick={() => setIsStarted(false)}
        >
          Start
        </button>
      )}
      {!isStarted && (
        <>
          <ul className="App__list">
            {sorted.map(good => (
              <li
                key={good}
                className="App__item"
              >
                {good}
              </li>
            ))}
          </ul>
          <span className="App__button">
            <button
              type="button"
              className="button"
              onClick={() => setSortBy(SortType.ALPHABET)}
            >
              Sort alphabetically
            </button>
            <button
              type="button"
              className="button"
              onClick={() => setSortBy(SortType.LENGTH)}
            >
              Sort by length
            </button>
            <button
              type="button"
              className="button"
              onClick={() => setIsReversed(current => !current)}
            >
              Reverse
            </button>
          </span>
          <button
            type="button"
            className="button"
            onClick={() => reset()}
          >
            Reset
          </button>
        </>
      )}
    </div>
  );
};
