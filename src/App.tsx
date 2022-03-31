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
  const [start, setStart] = useState(false);
  const [goods, setGoods] = useState(goodsFromServer);
  const [sorted, setSort] = useState(false);
  const [sortedByLength, setSortByLength] = useState(false);

  const reverse = () => {
    setGoods([...goods.reverse()]);
  };

  const sort = () => {
    setGoods([...goods.sort(
      !sorted
        ? (a, b) => a.localeCompare(b)
        : (b, a) => a.localeCompare(b),
    )]);
    setSort(!sorted);
  };

  const sortByLength = () => {
    setGoods([...goods.sort(
      sortedByLength
        ? (a, b) => a.length - b.length
        : (b, a) => a.length - b.length,
    )]);
    setSortByLength(true);
  };

  const reset = () => {
    setGoods(goodsFromServer);
  };

  return (
    <div className="App">
      <h1>Goods</h1>
      {!start && (
        <button
          type="button"
          onClick={() => setStart(true)}
          className="btn"
        >
          Start
        </button>
      )}
      <p>
        {start && (
          <div>
            <button
              type="button"
              className="btn"
              onClick={reverse}
            >
              Reverse
            </button>
            <button
              type="button"
              onClick={sort}
              className="btn"
            >
              Sort alphabetically
            </button>
            <button
              type="button"
              className="btn"
              onClick={sortByLength}
            >
              Sort by length
            </button>
            <button
              type="button"
              onClick={reset}
              className="btn"
            >
              Reset
            </button>
            <ul className="goods-list">
              {goods.map(good => (
                <li
                  key={good}
                >
                  {good}
                </li>
              ))}
            </ul>
          </div>
        )}
      </p>
    </div>
  );
};

export default App;
