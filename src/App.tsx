import React, { useState } from 'react';
import { ProductsList } from './ProductsList';
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
  const [isVisible, setVisibeled] = useState(false);

  const reverse = () => {
    setGoods([...goods].reverse());
  };

  const sortAlphabetically = () => {
    setGoods([...goods].sort((goodA, goodB) => goodA.localeCompare(goodB)));
  };

  const sortByLength = () => {
    setGoods([...goods].sort((goodA, goodB) => goodA.length - goodB.length));
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
  };

  return (
    <div className="App">
      <h1>Goods</h1>
      {!isVisible && (
        <button
          type="button"
          onClick={() => setVisibeled(true)}
        >
          Start
        </button>
      )}
      {isVisible && (
        <div>
          <button
            type="button"
            onClick={reverse}
          >
            Revers
          </button>
          <button
            type="button"
            onClick={sortAlphabetically}
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
            onClick={reset}
          >
            Reset
          </button>
        </div>
      )}

      {isVisible && (
        <ProductsList products={goodsFromServer} />
      )}
    </div>
  );
};

export default App;
