/* eslint-disable react/no-unused-state */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Alphabet,
  Length,
  None,
}

export const App: React.FC = () => {
  const copyGoods = [...goodsFromServer];

  const [isVisible, setIsVisible] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState<SortType>(SortType.None);

  const reset = () => {
    setIsReversed(false);
    setSortBy(SortType.None);
  };

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  if (isReversed) {
    copyGoods.reverse();
  }

  switch (sortBy) {
    case SortType.Length:
      copyGoods.sort((good1, good2) => (good1.length - good2.length));

      break;

    case SortType.Alphabet:
      copyGoods.sort((good1, good2) => good1.localeCompare(good2));

      break;
    default:
      break;
  }

  return (
    <div className="App">
      <div className="App__start">
        {!isVisible && (
          <button
            type="button"
            className="App__button"
            onClick={() => setIsVisible(true)}
          >
            Start
          </button>
        )}
      </div>

      {isVisible && (
        <div className="App__container">
          <ul className="App__list">
            {(copyGoods.map((good) => (
              <li
                key={good}
                className="App__item"
              >
                {good}
              </li>
            )))}
          </ul>

          <button
            className="App__button"
            onClick={reverse}
            type="button"
          >
            Reverse
          </button>

          <button
            className="App__button"
            onClick={reset}
            type="button"
          >
            Reset
          </button>

          <button
            className="App__button"
            onClick={() => setSortBy(SortType.Alphabet)}
            type="button"
          >
            Sort alphabetic
          </button>

          <button
            className="App__button"
            onClick={() => setSortBy(SortType.Length)}
            type="button"
          >
            Sort by length
          </button>

        </div>
      )}
    </div>
  );
};
