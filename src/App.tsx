import React, { useState } from 'react';
import './App.scss';

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
  const [goods, setGoods] = useState(goodsFromServer);
  const [isVisible, setIsVisible] = useState(false);
  const [lengthName, setLengthName] = useState(1);

  const reverse = () => {
    setGoods([...goods].reverse());
  };

  const sortAlph = () => {
    setGoods([...goods].sort((i1, i2) => i1.localeCompare(i2)));
  };

  const sortLength = () => {
    setGoods([...goods].sort((i1, i2) => i1.length - i2.length));
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
    setLengthName(1);
  };

  const changeLen = (event: { target: { value: string } }): void => {
    const { value } = event.target;

    setLengthName(+value);
  };

  const selectLength = goods.filter(good => good.length >= lengthName);

  return isVisible
    ? (
      <div className="app">
        <h1>Goods</h1>
        <ul className="app__list">
          {selectLength.map(good => (
            <li key={good} className="app__list-item">
              {good}
            </li>
          ))}
        </ul>

        <div className="app__buttonBox">
          <button
            className="app__button"
            type="button"
            onClick={reverse}
          >
            Reverse
          </button>

          <button
            className="app__button"
            type="button"
            onClick={sortAlph}
          >
            Sort alphabetically
          </button>

          <button
            className="app__button"
            type="button"
            onClick={sortLength}
          >
            Sort by length
          </button>

          <button
            className="app__button"
            type="button"
            onClick={reset}
          >
            Reset
          </button>

          <form method="GET" className="app__form">
            <span className="app__form">min length</span>
            <select value={lengthName} onChange={changeLen}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </form>
        </div>
      </div>
    )
    : (
      <button
        className="app__start"
        type="button"
        onClick={() => setIsXisible(true)}
      >
        START
      </button>
    );
};
