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
  const [goods, setgoods] = useState([...goodsFromServer]);
  const [visible, setVisible] = useState(false);
  const visibleGoods = [...goods];

  const start = () => {
    setVisible(true);
  };

  const reverse = () => {
    setgoods([...goods].reverse());
  };

  const sortAbc = () => {
    setgoods([...goods].sort((a, b) => a.localeCompare(b)));
  };

  const sortLength = () => {
    setgoods([...goods].sort((a, b) => a.length - b.length));
  };

  const reset = () => {
    setgoods([...goodsFromServer]);
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
            {visibleGoods.map(good => (
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
