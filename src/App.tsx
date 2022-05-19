import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './components/GoodsList';

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
  const [goodsList, setGoodsList] = useState(goodsFromServer);
  const [isVisible, setIsVisible] = useState(false);

  const showGoods = () => {
    setIsVisible(true);
  };

  const reverse = () => {
    setGoodsList([...goodsList].reverse());
  };

  const sortByName = () => {
    setGoodsList([...goodsList].sort((a, b) => a.localeCompare(b)));
  };

  const sortByLength = () => {
    setGoodsList([...goodsList].sort((a, b) => a.length - b.length));
  };

  const reset = () => {
    setGoodsList(goodsFromServer);
  };

  return isVisible
    ? (
      <div className="App">
        <h1>Goods</h1>
        <button
          type="button"
          onClick={reverse}
        >
          Reverse
        </button>
        <button
          type="button"
          onClick={sortByName}
        >
          Sort by Name
        </button>
        <button
          type="button"
          onClick={sortByLength}
        >
          Sort by Length
        </button>
        <button
          type="button"
          onClick={reset}
        >
          Reset
        </button>
        <GoodsList goods={goodsList} />
      </div>
    )
    : (
      <button
        type="button"
        onClick={showGoods}
      >
        Start
      </button>
    );
};

export default App;
