/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
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
  const [visibilityGoods, setVisibilityGoods] = useState(false);
  const [currentGoods, setCurrentGoods] = useState(goodsFromServer);
  const [filterGoods, setFilterGoods] = useState(currentGoods);
  const [minLength, setMinLength] = useState('1');

  useEffect(() => {
    setFilterGoods([...currentGoods].filter(el => {
      return el.length >= +minLength;
    }));
  }, [minLength, currentGoods]);

  return (
    <div className="App has-background-light">
      <div className="container">
        {!visibilityGoods
        && (
          <button
            type="button"
            className="button is-danger is-outlined"
            onClick={() => setVisibilityGoods(true)}
          >
            Start
          </button>
        )}
        <h1 className="title is-1 has-text-primary-dark">Goods</h1>
        {visibilityGoods
        && (
          <>
            <ul>
              {filterGoods.map(el => (
                <li
                  key={el}
                  className="has-text-warning-dark"
                >
                  {el}
                </li>
              ))}
            </ul>
            <div className="level">
              <div className="buttons are-medium level-left">
                <button
                  type="button"
                  className="button is-primary is-outlined"
                  onClick={() => setCurrentGoods((prev) => [...prev].reverse())}
                >
                  Reverse
                </button>
                <button
                  type="button"
                  className="button is-primary is-outlined"
                  onClick={() => setCurrentGoods((prev) => {
                    return [...prev].sort((a, b) => a.localeCompare(b));
                  })}
                >
                  Sort alphabetically
                </button>
                <button
                  type="button"
                  className="button is-primary is-outlined"
                  onClick={() => {
                    setCurrentGoods(goodsFromServer);
                    setMinLength('1');
                  }}
                >
                  Reset
                </button>
                <button
                  type="button"
                  className="button is-primary is-outlined"
                  onClick={() => setCurrentGoods((prev) => {
                    return [...prev].sort((a, b) => a.length - b.length);
                  })}
                >
                  Sort by length
                </button>
              </div>
              <div className="select is-primary">
                <select
                  name="onlyBiger"
                  value={minLength}
                  className="level-right"
                  onChange={(e) => {
                    setMinLength(e.target.value);
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
