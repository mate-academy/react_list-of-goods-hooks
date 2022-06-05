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
  const [status, isVisible] = useState(false);
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [filteredNumber, setFilterNumber] = useState(1);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const filterGoods = [...goods].filter(good => good.length <= filteredNumber);

  return (
    <div className="App">
      <h1 className="title">Goods</h1>
      {!status
        ? (
          <button
            className="button"
            type="button"
            onClick={() => isVisible(true)}
          >
            Start
          </button>
        )
        : (
          <div>
            <button
              className="button"
              type="button"
              onClick={() => setGoods([...goods].reverse())}
            >
              Reverse
            </button>

            <button
              className="button"
              type="button"
              onClick={() => setGoods([...goods].sort())}
            >
              Sort alphabetically
            </button>

            <button
              className="button"
              type="button"
              onClick={() => setGoods([...goodsFromServer])}
            >
              Reset
            </button>

            <button
              className="button"
              type="button"
              onClick={() => setGoods([...goods]
                .sort((a, b) => a.length - b.length))}
            >
              Sort by length
            </button>

            <select
              className="button"
              name=""
              id=""
              onChange={(event) => setFilterNumber(+event.currentTarget.value)}
            >
              {numbers.map(number => (
                <option value={number} key={number}>{number}</option>
              ))}

            </select>
            <ul className="list">
              {filterGoods.map(good => (
                <li className="item" key={good}>
                  {good}
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};

export default App;
