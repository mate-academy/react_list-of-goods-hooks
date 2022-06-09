import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './componets/GoodesList';

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
  const [showButton, setToggle] = useState(true);
  const [changeGoods, setGoods] = useState([...goodsFromServer]);

  const reverse = () => {
    setGoods([...changeGoods].reverse());
  };

  const sortGoodsByAlphabet = () => {
    setGoods([...changeGoods]
      .sort((product1, product2) => product1.localeCompare(product2)));
  };

  const sortGoodsByLength = () => {
    setGoods([...changeGoods]
      .sort((product1, product2) => product1.length - product2.length));
  };

  return (
    <div className="App">
      <h1 className="title">Goods</h1>
      {showButton
        && (
          <>
            <button
              type="button"
              onClick={() => setToggle(false)}
              className="show-button level-item button is-primary is-light"
            >
              Start
            </button>
          </>
        )}

      {!showButton
      && (
        <>
          <GoodsList goods={changeGoods} />
          <button
            type="button"
            onClick={reverse}
            className="button-insert button is-primary is-light"
          >
            Reverse
          </button>
          <button
            type="button"
            onClick={sortGoodsByAlphabet}
            className="button-insert button is-primary is-light"
          >
            Sort alphabetically
          </button>
          <button
            type="button"
            onClick={() => setGoods([...goodsFromServer])}
            className="button-insert button is-primary is-light"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={sortGoodsByLength}
            className="button-insert button is-primary is-light"
          >
            Sort by length
          </button>
        </>
      )}
    </div>
  );
};

export default App;
