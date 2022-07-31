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

  const sortByAlphabet = () => {
    const goodsCopy = [...goods];

    setGoods(goodsCopy.sort((a, b) => a.localeCompare(b)));
  };

  const sortByLength = () => {
    const goodsCopy = [...goods];

    setGoods(goodsCopy.sort((a, b) => a.length - b.length));
  };

  const reverse = () => {
    setGoods([...goods].reverse());
  };

  const reset = () => {
    setGoods(goodsFromServer);
  };

  return (
    <div className="App">
      {!isStarted
        && (
          <button
            type="button"
            className="button is-primary"
            onClick={start}
          >
            Start
          </button>
        )}

      {isStarted && (
        <>
          <button
            type="button"
            className="button is-primary"
            onClick={sortByAlphabet}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className="button is-primary"
            onClick={sortByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className="button is-primary"
            onClick={reverse}
          >
            Reverse
          </button>

          <button
            type="button"
            className="button is-primary"
            onClick={reset}
          >
            Reset
          </button>

          {isStarted
            && (
              <ul className="Goods">
                {goods.map(good => (
                  <li
                    key={good}
                    className="Goods__item"
                  >
                    <span>{good}</span>
                  </li>
                ))}
              </ul>
            )}
        </>
      )}
    </div>
  );
};
