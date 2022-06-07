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

export const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [goods, setGoods] = useState(goodsFromServer);

  const goodsCopy = [...goods];

  const reverse = () => {
    setGoods(goodsCopy.reverse());
  };

  const sortAlphabetically = () => {
    setGoods(goodsCopy.sort((a, b) => a.localeCompare(b)));
  };

  const sortByLength = () => {
    setGoods(goodsCopy.sort((a, b) => a.length - b.length));
  };

  const reset = () => {
    setGoods(goodsFromServer);
  };

  return (
    <div className="container text-center">

      {!isVisible && (
        <button
          className="btn btn-success btn-lg"
          type="button"
          onClick={() => setIsVisible(true)}
        >
          Start
        </button>
      )}

      {isVisible && (
        <>
          <h1>Goods</h1>

          <GoodsList products={goods} />

          <div className="buttons d-flex justify-content-evenly">
            <button
              className="btn btn-warning"
              type="button"
              onClick={reverse}
            >
              Reverse
            </button>

            <button
              className="btn btn-success"
              type="button"
              onClick={sortAlphabetically}
            >
              Sort alphabetically
            </button>

            <button
              className="btn btn-success"
              type="button"
              onClick={sortByLength}
            >
              Sort by length
            </button>

            <button
              className="btn btn-danger"
              type="button"
              onClick={reset}
            >
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  );
};
