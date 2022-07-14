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
  const [isVisible, setVisible] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [sortBy, setSortBy] = useState('alphabetically');

  const handleVisibleGoodsListClick = () => setVisible(!isVisible);

  const handleReverseClick = () => setIsReversed(!isReversed);

  const handleResetClick = () => {
    setSortBy('');
    setIsReversed(false);
    setIsSorted(false);
  };

  const handleSortByLengthClick = () => {
    setIsSorted(true);
    setSortBy('length');
  };

  const handleSortByAlphabeticallyClick = () => {
    setIsSorted(true);
    setSortBy('alphabet');
  };

  const goods = [...goodsFromServer];

  if (isSorted) {
    goods.sort((product1, product2): number => {
      switch (sortBy) {
        case 'length':
          return product1.length - product2.length;

        case 'alphabet':
          if (!isReversed) {
            return product1.localeCompare(product2);
          }

          return product2.localeCompare(product1);

        default: return 0;
      }
    });
  }

  if (isReversed) {
    goods.reverse();
  }

  return (
    <div className="App">
      {!isVisible && (
        <button
          type="button"
          className="App__button"
          onClick={handleVisibleGoodsListClick}
        >
          Start
        </button>
      )}

      {isVisible && (
        <div className="App__container">
          <ul className="App__list">
            {(goods.map((good) => (
              <li
                key={good}
                className="App__item"
              >
                {good}
              </li>
            )))}
          </ul>

          <div className="App__service-container__button">
            <button
              className="App__button"
              onClick={handleReverseClick}
              type="button"
            >
              Reverse
            </button>

            <button
              className="App__button"
              onClick={handleResetClick}
              type="button"
            >
              Reset
            </button>
          </div>

          <div className="App__sorting-container__button">
            <button
              className="App__button"
              onClick={handleSortByLengthClick}
              type="button"
            >
              Sort by length
            </button>

            <button
              className="App__button"
              onClick={handleSortByAlphabeticallyClick}
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
