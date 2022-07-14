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

  const onVisibleGoodsListClick = () => setVisible(!isVisible);

  const onReverseClick = () => setIsReversed(!isReversed);

  const onResetClick = () => {
    setSortBy('');
    setIsReversed(false);
    setIsSorted(false);
  };

  const onSortByLengthClick = () => {
    setIsSorted(true);
    setSortBy('length');
  };

  const onSortByAlphabeticallyClick = () => {
    setIsSorted(true);
    setSortBy('alphabet');
  };

  const newGoods = [...goods];

  if (isSorted) {
    newGoods.sort((product1, product2): number => {
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
    newGoods.reverse();
  }

  return (
    <div className="App">
      {!isVisible && (
        <button
          type="button"
          className="App__button"
          onClick={onVisibleGoodsListClick}
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

          <div className="App__service-container__button">
            <button
              className="App__button"
              onClick={onReverseClick}
              type="button"
            >
              Reverse
            </button>

            <button
              className="App__button"
              onClick={onResetClick}
              type="button"
            >
              Reset
            </button>
          </div>

          <div className="App__sorting-container__button">
            <button
              className="App__button"
              onClick={onSortByLengthClick}
              type="button"
            >
              Sort by length
            </button>

            <button
              className="App__button"
              onClick={onSortByAlphabeticallyClick}
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
