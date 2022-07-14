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

export const App = () => {
  const goods = goodsFromServer;

  const [isVisible, setVisible] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [sortBy, setSortBy] = useState('alphabetically');

  const visibleGoodsList = () => setVisible(!isVisible);

  const reverse = () => setIsReversed(!isReversed);

  const reset = () => {
    setSortBy('');
    setIsReversed(false);
    setIsSorted(false);
  };

  const sortByLength = () => {
    setIsSorted(true);
    setSortBy('length');
  };

  const sortByAlphabetically = () => {
    setIsSorted(true);
    setSortBy('alphabet');
  };

  const newGoods = [...goods];

  if (isSorted) {
    newGoods.sort((good1, good2): number => {
      switch (sortBy) {
        case 'length':
          return good1.length - good2.length;

        case 'alphabet':
          // I added "if" because if the array is flipped it will not sort correctly
          if (!isReversed) {
            return good1.localeCompare(good2);
          }

          return good2.localeCompare(good1);

        default: return 0;
      }
    });
  }

  if (isReversed) {
    newGoods.reverse();
  }

  return (
    <div className="App">
      {!isVisible && (
        <button
          type="button"
          className="App__button"
          onClick={visibleGoodsList}
        >
          Start
        </button>
      )}

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

          <div className="App__serviceContainer-button">
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
          </div>

          <div className="App__sortingContainer-button">
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
        </div>
      )}
    </div>
  );
};
