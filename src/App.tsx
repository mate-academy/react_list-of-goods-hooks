import React, { useState } from 'react';
import './App.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export const App: React.FC = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isStarted, setStart] = useState(false);

  const start = () => {
    setStart(true);
  };

  const sortAlph = () => {
    const copy = [...goods];

    setGoods(copy.sort((a, b) => a.localeCompare(b)));
  };

  const sortLen = () => {
    const copy = [...goods];

    setGoods(copy.sort((a, b) => a.length - b.length));
  };

  const reverse = () => {
    setGoods([...goods].reverse());
  };

  const reset = () => {
    setGoods(goodsFromServer);
  };

  return (
    <div className="App column">
      <div className="level">
        {!isStarted
          && (
            <button
              type="button"
              onClick={start}
              className="button is-light is-primary level-item"
            >
              Start
            </button>
          )}

        {isStarted
          && (
            <button
              type="button"
              onClick={sortAlph}
              className="button is-light is-link"
            >
              Sort alphabetically
            </button>
          )}

        {isStarted
          && (
            <button
              type="button"
              onClick={sortLen}
              className="button is-light is-link"
            >
              Sort by length
            </button>
          )}

        {isStarted
          && (
            <button
              type="button"
              onClick={reverse}
              className="button is-light is-link"
            >
              Reverse
            </button>
          )}

        {isStarted
          && (
            <button
              type="button"
              onClick={reset}
              className="button is-light is-danger"
            >
              Reset
            </button>
          )}
      </div>

      {isStarted
          && (
            <ul className="panel Goods">
              {isStarted
                && goods.map(good => (
                  <li className="Goods__item panel-block" key={good}>{good}</li>
                ))}
            </ul>
          )}
    </div>
  );
};
