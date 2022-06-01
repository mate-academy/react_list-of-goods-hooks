import React, { useState } from 'react';
import './App.css';
import Goods from './Components/Goods/Goods';

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
  const [goods] = useState(goodsFromServer);
  const [isStart, setIsStart] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const startButton = () => {
    setIsStart(() => true);
  };

  const reverseButton = () => {
    setIsReverse(prev => !prev);
  };

  const resetButton = () => {
    setIsReverse(() => false);
    setSortBy(() => '');
  };

  const sortButton = (sortStr: string) => {
    setSortBy(() => sortStr);
  };

  const prepGoods: string[] = sortBy !== ''
    ? [...goods].sort((good1, good2) => {
      switch (sortBy) {
        case 'alphab': return good1.localeCompare(good2);
        case 'length': return good1.length - good2.length;
        default: return 0;
      }
    })
    : [...goods];

  if (isReverse) {
    prepGoods.reverse();
  }

  return (
    <div className="App">
      <h1 className="title">Goods</h1>
      { !isStart
        ? (
          <button className="button" type="button" onClick={startButton}>
            Start
          </button>
        )
        : (
          <>
            <button
              className="button"
              type="button"
              onClick={reverseButton}
            >
              Reverse
            </button>
            <button
              className="button"
              type="button"
              onClick={() => {
                sortButton('alphab');
              }}
            >
              Sort alphabetically
            </button>
            <button
              className="button"
              type="button"
              onClick={() => {
                sortButton('length');
              }}
            >
              Sort by length
            </button>
            <button
              className="button"
              type="button"
              onClick={resetButton}
            >
              resetButton
            </button>
            <Goods goods={prepGoods} />
          </>
        )}
    </div>
  );
};

export default App;
