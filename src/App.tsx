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
  const [isGoodsVisible, setIsGoodsVisible] = useState(false);

  const showList = () => {
    setIsGoodsVisible(!isGoodsVisible);
  };

  const reverse = () => {
    setGoods([...goods].reverse());
  };

  const sortByAbc = () => {
    setGoods([...goods].sort());
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
  };

  const sortByLength = () => {
    setGoods([...goods].sort((pr1, pr2) => pr1.length - pr2.length));
  };

  return (
    <div className="App">
      <h1>Goods</h1>

      <button
        type="button"
        onClick={showList}
      >
        Start
      </button>

      <button
        type="button"
        onClick={reverse}
      >
        Reverse
      </button>

      <button
        type="button"
        onClick={sortByAbc}
      >
        Sort alphavetically
      </button>

      <button
        type="button"
        onClick={sortByLength}
      >
        Sort by length
      </button>

      <button
        type="button"
        onClick={reset}
      >
        Reset
      </button>

      {isGoodsVisible && (
        <ul>
          {goods.map(good => (
            <li key={good}>
              {good}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
