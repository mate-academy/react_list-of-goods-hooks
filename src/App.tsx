import React, { useState } from 'react';
import classNames from 'classnames';
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
  const [goods, setGoods] = useState(goodsFromServer);
  const [start, setStart] = useState(false);

  const revers = (arr: string[]) => [...arr].reverse();
  const sortAlphabetically = (arr: string[]) => [...arr].sort((a, b) => a.localeCompare(b));
  const sortByLength = (arr: string[]) => [...arr].sort((a, b) => a.length - b.length);

  return (
    <div className="App">
      <h1>Goods</h1>
      <button
        className={classNames('btn', 'startBtn', { hidden: start })}
        type="button"
        onClick={() => setStart(true)}
      >
        Start
      </button>
      {start && (
        <div className="container">
          <ul className="listOfGoods">
            {goods.map(good => (
              <li key={good}>
                {good}
              </li>
            ))}
          </ul>
          <div className="buttons">
            <button
              className="btn"
              type="button"
              onClick={() => setGoods(revers(goods))}
            >
              Reverse
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => setGoods(sortAlphabetically(goods))}
            >
              Sort alphabetically
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => setGoods(sortByLength(goods))}
            >
              Sort by length
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => setGoods(goodsFromServer)}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
