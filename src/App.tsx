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
  const [sortedAlpha, setSort] = useState(false);
  const [sortedByLength, setSortByLength] = useState(false);

  const reverse = () => {
    setGoods([...goods.reverse()]);
  };

  const sort = () => {
    setGoods([...goods.sort(
      !sortedAlpha
        ? (a, b) => a.localeCompare(b)
        : (b, a) => a.localeCompare(b),
    )]);
    setSort(!sortedAlpha);
  };

  const sortByLength = () => {
    setGoods([...goods.sort(
      sortedByLength
        ? (a, b) => a.length - b.length
        : (b, a) => a.length - b.length,
    )]);
    setSortByLength(!sortedByLength);
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
          className="btnblock__btn"
          onClick={() => setStart(true)}
        >
          Start
        </button>
      )}
      <p>
        {start && (
          <>
            <div className="btnblock">
              <button
                type="button"
                className="btnblock__btn"
                onClick={reverse}
              >
                Reverse
              </button>
              <button
                type="button"
                className="btnblock__btn"
                onClick={sort}
              >
                Sort alphabetically
                {sortedAlpha && ' descending' }
              </button>
              <button
                type="button"
                className="btnblock__btn"
                onClick={sortByLength}
              >
                Sort by length
                {sortedByLength && ' ascending' }
              </button>
              <button
                type="button"
                className="btnblock__btn"
                onClick={reset}
              >
                Reset
              </button>
            </div>
            <div className="goods-list">
              <ul>
                {goods.map(good => (
                  <li key={good}>{good}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </p>
    </div>
  );
};

export default App;
