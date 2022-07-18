import { useState } from 'react';
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

export const App = () => {
  const [isVisible, setVisible] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [sortBy, setSortBy] = useState(SortType.NONE);

  const visibleGoodsList = () => setVisible(!isVisible);

  const reverse = () => setIsReversed(!isReversed);

  const reset = () => {
    setSortBy(SortType.NONE);
    setIsReversed(false);
    setIsSorted(false);
  };

  const sortByLength = () => {
    setIsSorted(true);
    setSortBy(SortType.LENGTH);
  };

  const sortByAlphabetically = () => {
    setIsSorted(true);
    setSortBy(SortType.ALPABET);
  };

  const newGoods = [...goodsFromServer];

  if (isSorted) {
    newGoods.sort((good1, good2): number => {
      switch (sortBy) {
        case SortType.LENGTH:
          return good1.length - good2.length;

        case SortType.ALPABET:
          return good1.localeCompare(good2);

        default: return 0;
      }
    });
  }

  if (isReversed) {
    newGoods.reverse();
  }

  return (
    <div className="App">
      <div className="App__start">
        {!isVisible && (
          <button
            type="button"
            className="App__button"
            onClick={visibleGoodsList}
          >
            Start
          </button>
        )}
      </div>

      {isVisible && (
        <div className="App__container">
          <ul className="App__list">
            {(newGoods.map((good) => (
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
            onClick={sortByLength}
            type="button"
          >
            Sort by length
          </button>

          <button
            className="App__button"
            onClick={sortByAlphabetically}
            type="button"
          >
            Sort alphabetically
          </button>
        </div>
      )}
    </div>
  );
};
