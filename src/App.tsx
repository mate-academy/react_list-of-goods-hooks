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

  const getReversedGoods = () => {
    setVisibleGoods([...visibleGoods].reverse());
  };

  const getFiteredGoods = (length: number) => {
    changeMinLength(length);
    setVisibleGoods(goodsFromServer.filter(good => (
      good.length >= length
    )));
  };

  const getSortedGoods = (method: string) => {
    if (method === 'abc') {
      setVisibleGoods([...visibleGoods].sort((a, b) => (
        a.localeCompare(b)
      )));
    } else {
      setVisibleGoods([...visibleGoods].sort((a, b) => (
        a.length - b.length
      )));
    }
  };

  const resetGoods = () => {
    setVisibleGoods(goodsFromServer);
    changeMinLength(1);
  };

  return (
    <div
      className="App box container"
    >
      <h1
        className="title has-text-centered"
      >
        Goods
      </h1>
      {!goodsIsVisible
        ? (
          <button
            className="button is-success is-outlined"
            type="button"
            onClick={() => showGoods(true)}
          >
            Start
          </button>
        )
        : (
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
                onClick={() => getReversedGoods()}
              >
                Reverse
              </button>

              <button
                className="button"
                type="button"
                onClick={() => getSortedGoods('abc')}
              >
                Sort alphabetically
              </button>

              <button
                className="button"
                type="button"
                onClick={() => getSortedGoods('length')}
              >
                Sort by length
              </button>

              <select
                className="button"
                name=""
                id=""
                value={minLength}
                onChange={(e) => {
                  getFiteredGoods(+e.target.value);
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
                onClick={() => resetGoods()}
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
