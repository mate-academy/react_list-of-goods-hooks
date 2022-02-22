import { useState } from 'react';
import './App.css';
import { GoodsList } from './GoodsList';

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
  const [isVisible, setVision] = useState(false);
  const [sortBy, setSortingOrder] = useState('');
  const [isReversed, setReverse] = useState(false);
  const [items] = useState(goodsFromServer);

  const start = () => {
    setVision(true);
  };

  const sortByLength = () => {
    setSortingOrder('length');
  };

  const sortByAlphabet = () => {
    setSortingOrder('alphabet');
  };

  const reverse = () => {
    setReverse(true);
  };

  const reset = () => {
    setReverse(false);
    setSortingOrder('');
  };

  const copyOfGoods = [...items];

  copyOfGoods.sort((g1, g2) => {
    switch (sortBy) {
      case 'length':
        return g1.length - g2.length;

      case 'alphabet':
        return g1.localeCompare(g2);
      default:
        return 0;
    }
  });

  if (!isReversed) {
    copyOfGoods.reverse();
  }

  return (
    <div className="App">

      {isVisible ? (
        <>
          <GoodsList listOfGoods={copyOfGoods} />

          <button
            type="button"
            className="reverse-button"
            onClick={reverse}
          >
            Reverse
          </button>

          <button
            type="button"
            className="sortedByAlphabet-button"
            onClick={sortByAlphabet}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className="ortedByLength-button"
            onClick={sortByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className="reset-button"
            onClick={reset}
          >
            Reset
          </button>
        </>
      ) : (
        <button
          type="button"
          className="start-button"
          onClick={start}
        >
          Start
        </button>
      )}
    </div>
  );
};
