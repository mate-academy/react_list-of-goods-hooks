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
  const [goodsIsVisible, showGoods] = useState(false);
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [minLength, changeMinLength] = useState(1);

  return (
    <div
      className="App box container"
    >
      <h1
        className="title has-text-centered"
      >
        Goods
      </h1>
      {!goodsIsVisible && (
        <button
          className="button is-success is-outlined"
          type="button"
          onClick={() => showGoods(true)}
        >
          Start
        </button>
      )}
      {goodsIsVisible && (
        <>
          <ul>
            {visibleGoods.map(good => {
              return (
                <li
                  key={good}
                  className="has-text-centered"
                >
                  {good}
                </li>
              );
            })}
          </ul>

          <div className="is-flex">
            <button
              className="button"
              type="button"
              onClick={() => setVisibleGoods([...visibleGoods].reverse())}
            >
              Reverse
            </button>

            <button
              className="button"
              type="button"
              onClick={() => setVisibleGoods([...visibleGoods].sort((a, b) => (
                a.localeCompare(b)
              )))}
            >
              Sort alphabetically
            </button>

            <button
              className="button"
              type="button"
              onClick={() => setVisibleGoods([...visibleGoods].sort((a, b) => (
                a.length - b.length
              )))}
            >
              Sort by length
            </button>

            <select
              className="button"
              name=""
              id=""
              value={minLength}
              onChange={(e) => {
                setVisibleGoods(goodsFromServer.filter(good => (
                  good.length >= +e.target.value
                )));
                changeMinLength(+e.target.value);
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          {visibleGoods !== goodsFromServer && (
            <button
              className="button is-danger is-outlined is-fullwidth"
              type="button"
              onClick={() => {
                setVisibleGoods(goodsFromServer);
                changeMinLength(1);
              }}
            >
              Reset
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default App;
