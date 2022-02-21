import React, { useState } from 'react';
import { GoodsList } from './components/GoodsList';
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

const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortedBy, setSortedBy] = useState('');

  const start = () => {
    setIsVisible(true);
  };

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const sortedByAlphabet = () => {
    setSortedBy('alphabet');
  };

  const sortedByLength = () => {
    setSortedBy('length');
  };

  const reset = () => {
    setIsReversed(false);
    setSortedBy('');
  };

  const prepareGoods = () => {
    const copyGoods = [...goodsFromServer];

    copyGoods.sort((good1, good2) => {
      switch (sortedBy) {
        case 'alphabet':
          return good1.localeCompare(good2);
        case 'length':
          return good1.length - good2.length;
        default:
          return 0;
      }
    });

    if (isReversed) {
      copyGoods.reverse();
    }

    return copyGoods;
  };

  return (
    <div className="App">
      {!isVisible && (
        <button
          type="button"
          className="start-button"
          onClick={start}
        >
          Start
        </button>
      )}

      {isVisible && (
        <>
          <GoodsList goodslist={prepareGoods()} />

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
            onClick={sortedByAlphabet}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className="ortedByLength-button"
            onClick={sortedByLength}
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
      )}
    </div>
  );
};

export default App;
