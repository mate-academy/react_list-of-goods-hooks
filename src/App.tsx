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
  const [start, setStart] = useState(true);
  const [goods, setGoods] = useState(goodsFromServer);

  return (
    <div className="app">
      <h1 className="app__title">
        Goods
      </h1>
      {start
        ? (
          <div className="container">
            <button
              type="button"
              onClick={() => {
                setStart(false);
              }}
              className="button__start"
            >
              Start
            </button>
          </div>
        )
        : (
          <div className="container">
            <button
              type="button"
              onClick={() => {
                setStart(true);
                setGoods([...goodsFromServer]);
              }}
              className="button__finish"
            >
              Finish
            </button>
            <ul className="list">
              {goods.map(good => (
                <li key={good} className="list__item">
                  {good}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setGoods(good => [...good].sort((a, b) => a.localeCompare(b)));
              }}
              className="button"
            >
              Sort alphabetically
            </button>
            <button
              type="button"
              onClick={() => {
                setGoods(good => [...good].sort((a, b) => a.length - b.length));
              }}
              className="button"
            >
              Sort by length
            </button>
            <button
              type="button"
              onClick={() => {
                setGoods(good => [...good].reverse());
              }}
              className="button"
            >
              Reverse
            </button>
            <button
              type="button"
              onClick={() => {
                setGoods([...goodsFromServer]);
              }}
              className="button"
            >
              Reset
            </button>
          </div>
        )}
    </div>
  );
};

export default App;
