import React, { useState } from 'react';
import './App.css';
import GoodList from './GoodList';

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
  const [isGoodsVisible, setIsGoodsVisible] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [isSortBy, setSortBy] = useState('');

  const showTheGoods = () => setIsGoodsVisible(true);

  const reverseGoods = () => setReversed(reverse => !reverse);

  const sortByAlphabet = () => setSortBy('Alpha');

  const sortByLength = () => setSortBy('Length');

  const resetTheGoods = () => {
    setSortBy('');
    setReversed(false);
  };

  const newGoods = [...goodsFromServer];

  newGoods.sort((g1, g2) => {
    switch (isSortBy) {
      case 'Alpha':
        return g1.localeCompare(g2);
      case 'Length':
        return g1.length - g2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    newGoods.reverse();
  }

  return (
    <div className="App">
      <h1>Goods</h1>
      {isGoodsVisible === false
        ? (
          <button
            type="button"
            onClick={showTheGoods}
          >
            Start
          </button>
        )
        : (
          <>
            <GoodList newGoods={newGoods} />
            <button
              type="button"
              onClick={reverseGoods}
            >
              Reverse
            </button>
            <button
              type="button"
              onClick={sortByAlphabet}
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
              onClick={resetTheGoods}
            >
              Reset
            </button>
          </>
        )}
    </div>
  );
};

export default App;
