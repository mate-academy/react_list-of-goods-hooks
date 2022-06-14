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
      <h1 className="App__header title">
        Goods
      </h1>

      <button
        type="button"
        onClick={showList}
        className="
          button
          is-info
          is-light
          App__button"
      >
        Start
      </button>

      <button
        type="button"
        onClick={reverse}
        className="
          button
          is-info
          is-light
          App__button"
      >
        Reverse
      </button>

      <button
        type="button"
        onClick={sortByAbc}
        className="
          button
          is-info
          is-light
          App__button"
      >
        Sort alphavetically
      </button>

      <button
        type="button"
        onClick={sortByLength}
        className="
          button
          is-info
          is-light
          App__button"
      >
        Sort by length
      </button>

      <button
        type="button"
        onClick={reset}
        className="
          button
          is-info
          is-light
          App__button"
      >
        Reset
      </button>

      {isGoodsVisible && (
        <ul className="App__list">
          {goods.map(good => (
            <li
              key={good}
              className="App__item has-text-weight-light"
            >
              {good}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
