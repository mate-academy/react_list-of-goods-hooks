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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [visible, setVisible] = useState(false);

  const start = () => {
    setVisible(true);
  };

  const reverse = () => {
    setGoods([...goods].reverse());
  };

  const sortAbc = () => {
    setGoods([...goods].sort((a, b) => a.localeCompare(b)));
  };

  const sortLength = () => {
    setGoods([...goods].sort((a, b) => a.length - b.length));
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
  };

  return (
    <div className="App">
      {!visible && (
        <button
          className="button"
          type="button"
          onClick={start}
        >
          Start
        </button>
      )}

      {visible && (
        <>
          <ul className="list">
            {goods.map(good => (
              <li
                className="list-item"
                key={good}
              >
                {good}
              </li>
            ))}
          </ul>

          <div className="buttons">
            <button
              className="button"
              type="button"
              onClick={reverse}
            >
              Reverse
            </button>

            <button
              className="button"
              type="button"
              onClick={sortAbc}
            >
              Sort alphabetically
            </button>

            <button
              className="button"
              type="button"
              onClick={sortLength}
            >
              Sort by length
            </button>

            <button
              className="button"
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

export default App;
