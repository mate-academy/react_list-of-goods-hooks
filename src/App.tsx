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

export const App: React.FC = () => {
  const [isGoodsVisible, setIsGoodsVisible] = useState(false);
  const [reversedGoods, setIsReversedGoods] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const copyGoods = [...goodsFromServer];

  const showGoods = () => {
    setIsGoodsVisible(!isGoodsVisible);
  };

  const reverse = () => {
    setIsReversedGoods(!reversedGoods);
  };

  const sortByAlphabet = () => {
    setSortBy('Alphabet');
  };

  const sortByLength = () => {
    setSortBy('Length');
  };

  const reset = () => {
    setIsGoodsVisible(!isGoodsVisible);
    setIsReversedGoods(false);
    setSortBy('');
  };

  copyGoods.sort((a, b) => {
    switch (sortBy) {
      case ('Alphabet'):
        return a.localeCompare(b);
      case ('Length'):
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (reversedGoods) {
    copyGoods.reverse();
  }

  return (
    <>
      {isGoodsVisible
        ? (
          <>
            <ul>
              {copyGoods.map(good => (
                <li key={good}>{good}</li>
              ))}
            </ul>
            <button type="button" onClick={reverse}>Reverse</button>
            <button type="button" onClick={sortByAlphabet}>Sort alphabetically</button>
            <button type="button" onClick={sortByLength}>Sort by length</button>
            <button type="button" onClick={reset}>Reset</button>
          </>
        )
        : (
          <button
            type="button"
            onClick={showGoods}
          >
            Start
          </button>
        )}
    </>
  );
};

export default App;
