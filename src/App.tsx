import React, { useState } from 'react';
import './App.scss';
import { GoodsList } from './Components/GoodsList';

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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isGoodsVisible, setIsGoodsVisible] = useState(false);

  const showGoodsList = () => {
    setIsGoodsVisible(true);
  };

  const reverseGoods = () => {
    setGoods((prevGoods) => [...prevGoods].reverse());
  };

  const sortAlphabetical = () => {
    setGoods((prevGoods) => [...prevGoods]
      .sort((goodA, goodB) => goodA.localeCompare(goodB)));
  };

  const sortByLength = () => {
    setGoods((prevGoods) => [...prevGoods]
      .sort((goodA, goodB) => goodA.length - goodB.length));
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
  };

  return (
    <div className="App">
      <h1>Goods</h1>

      {isGoodsVisible
        ? (
          <>
            <GoodsList
              goods={goods}
            />

            <button
              type="button"
              className="btn"
              onClick={reverseGoods}
            >
              Reverse
            </button>

            <button
              type="button"
              className="btn"
              onClick={sortAlphabetical}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className="btn"
              onClick={sortByLength}
            >
              Sort by Length
            </button>

            <button
              type="button"
              className="btn"
              onClick={reset}
            >
              Reset
            </button>
          </>
        )
        : (
          <button
            type="button"
            className="btn btn--start"
            onClick={showGoodsList}
          >
            Show
          </button>
        )}
    </div>
  );
};

export default App;
