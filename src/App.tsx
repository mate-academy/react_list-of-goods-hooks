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
  const [goods, setGoods] = useState<string[]>([]);

  const showGoods = () => {
    setGoods([...goodsFromServer]);
  };

  const reversGood = () => {
    setGoods([...goods].reverse());
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
  };

  const sortByAlphabet = () => {
    setGoods([...goods].sort((a, b) => a.localeCompare(b)));
  };

  const sortByNameLength = () => {
    setGoods([...goods].sort((a, b) => a.length - b.length));
  };

  return (
    <div className="App">
      {goods.length === 0
        ? (
          <div className="block">
            <button
              type="button"
              className="
                btn
                btn-success
                btn-lg
              "
              onClick={showGoods}
            >
              Start
            </button>
          </div>
        ) : (
          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              type="button"
              className="btn btn-success"
              onClick={reversGood}
            >
              Reverse
            </button>
            <button
              type="button"
              onClick={sortByAlphabet}
              className="btn btn-success"
            >
              Sort alphabetically
            </button>
            <button
              type="button"
              onClick={resetGoods}
              className="btn btn-success"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={sortByNameLength}
              className="btn btn-success"
            >
              Sort by length
            </button>
          </div>
        )}

      <ul className="list-group">
        {goods.map(good => (
          <li
            key={good}
            className="list-group-item"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
