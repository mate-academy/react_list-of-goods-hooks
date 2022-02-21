import React, { useState } from 'react';
import './App.scss';
import { GoodsList } from './components/GoodsList';

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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isVisible, setVisibility] = useState(false);
  const [minLength, setMinLength] = useState(1);

  const changeVisibility = () => {
    setVisibility(current => !current);
  };

  const reverse = () => {
    setGoods([...goods.reverse()]);
  };

  const sortAlpabetically = () => {
    setGoods([...goods.sort((a, b) => a.localeCompare(b))]);
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
    setMinLength(1);
  };

  const sortByLength = () => {
    setGoods([...goods.sort((a, b) => b.length - a.length)]);
  };

  const changeLength = (value: number) => {
    setMinLength(value);
  };

  const normalizedGoods = goods.filter(product => product.length >= minLength);

  return (
    <div className="App">
      {isVisible || (
        <button
          type="button"
          onClick={changeVisibility}
          className="App__start-button"
        >
          Start
        </button>
      )}

      {isVisible && (
        <>
          <GoodsList goods={normalizedGoods} />

          <div className="App__buttons">
            <button
              type="button"
              onClick={reverse}
              className="App__button"
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={sortAlpabetically}
              className="App__button"
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={sortByLength}
              className="App__button"
            >
              Sort by length
            </button>

            <button
              type="button"
              onClick={reset}
              className="App__button"
            >
              Reset
            </button>
          </div>

          <label
            htmlFor="minLength"
            className="App__label"
          >
            Set min length
            <select
              onChange={(event) => (
                changeLength(+event.target.value)
              )}
              value={minLength}
              id="minLength"
              className="App__select"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => (
                <option value={number}>{number}</option>
              ))}
            </select>
          </label>
        </>
      )}
    </div>
  );
};

export default App;
