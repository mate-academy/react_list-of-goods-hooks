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

const App: React.FC = () => {
  const [isShowedGoods, setShowedGoods] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [isSortBy, setSortBy] = useState('');

  const showTheGoods = () => setShowedGoods(true);

  const reverseGoods = () => setReversed(revers => !revers);

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
      {isShowedGoods === false
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
            <ul>
              {newGoods.map(good => (
                <li key={good}>
                  {good}
                </li>
              ))}
            </ul>
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
