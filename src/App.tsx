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
  const [goods, setGoods] = useState(goodsFromServer);
  const [isVisible, setIsVisible] = useState(false);

  const showList = () => {
    setIsVisible(true);
  };

  const reverse = () => {
    setGoods([...goods].reverse());
  };

  const sortByName = () => {
    setGoods([...goods].sort((a, b) => a.localeCompare(b)));
  };

  const sortBylength = () => {
    setGoods([...goods].sort((a, b) => a.length - b.length));
  };

  const reset = () => {
    setGoods(goodsFromServer);
  };

  return isVisible ? (
    <div className="App">
      <h1>Goods</h1>

      <button type="button" onClick={reverse}>
        Reverse
      </button>

      <button type="button" onClick={sortByName}>
        Sort alphabetically
      </button>

      <button type="button" onClick={sortBylength}>
        Sort by length
      </button>

      <button type="button" onClick={reset}>
        Reset
      </button>

      <ol>
        {goods.map(good => (
          <li key={good}>
            {good}
          </li>
        ))}
      </ol>
    </div>
  ) : (
    <button type="button" onClick={showList}>
      Start
    </button>
  );
};

export default App;
