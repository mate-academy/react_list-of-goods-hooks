import React, { useState } from 'react';
import './App.css';

import playButton from './images/playButton.png';

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
  const [visible, setVisible] = useState(true);

  const showGoods = () => {
    setVisible(current => !current);
  };

  const resetGoods = () => {
    setGoods([...goodsFromServer]);
  };

  const reverseGoods = () => {
    setGoods(current => [...current].reverse());
  };

  const sortAlphabet = () => {
    setGoods(current => [...current].sort((a, b) => a.localeCompare(b)));
  };

  const sortByLength = () => {
    setGoods(current => [...current].sort((a, b) => a.length - b.length));
  };

  return (
    <div className="app">
      {visible ? (
        <button
          className="startButton"
          type="button"
          onClick={showGoods}
        >
          <img src={playButton} alt="start icon" />
        </button>
      ) : (
        <>
          <h1 className="title">
            Goods
          </h1>

          <button
            className="resetButton"
            type="button"
            onClick={resetGoods}
          >
            Reset
          </button>

          <ul className="goodsList">
            {goods.map(el => (
              <p className="goodItem" key={el}>
                {el}
              </p>
            ))}
          </ul>

          <div className="buttons">
            <button
              className="button"
              type="button"
              onClick={reverseGoods}
            >
              Reverse
            </button>

            <button
              className="button"
              type="button"
              onClick={sortAlphabet}
            >
              Sort alphabetically
            </button>

            <button
              className="button"
              type="button"
              onClick={sortByLength}
            >
              Sort by length
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
