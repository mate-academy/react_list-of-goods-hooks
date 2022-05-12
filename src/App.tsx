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
const numbers: number[] = Array.from(Array(10).keys());

const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [goods, setGoods] = useState(goodsFromServer);
  const [goodLength, setGoodLength] = useState('1');

  const reversedGoods = () => {
    setGoods([...goods].reverse());
  };

  const sortedGoods = () => {
    setGoods([...goods].sort((a, b) => a.localeCompare(b)));
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
  };

  const sortByLengthGoods = () => {
    setGoods([...goods].sort((a, b) => a.length - b.length));
  };

  const changeLength = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newGoods = goodsFromServer.filter(
      good => good.length >= Number(event.target.value),
    );

    setGoodLength(event.target.value);
    setGoods(newGoods);
  };

  const showGoods = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="App">
      {isVisible && (
        <button
          className="initial-button"
          type="button"
          onClick={showGoods}
        >
          Start
        </button>
      )}
      {!isVisible && (
        <>
          <div>
            <div className="products">
              <h1 className="products__title">
                Goods
              </h1>
              <ul className="products__list">
                {goods.map((good) => (
                  <li key={good}>
                    {good}
                  </li>
                ))}
              </ul>
            </div>
            <div className="button">
              <button
                className="button__choose"
                type="button"
                onClick={reversedGoods}
              >
                Reverse
              </button>
              <button
                className="button__choose"
                type="button"
                onClick={sortedGoods}
              >
                Sorted by Name
              </button>
              <button
                className="button__choose"
                type="button"
                onClick={resetGoods}
              >
                Reset
              </button>
              <button
                className="button__choose"
                type="button"
                onClick={sortByLengthGoods}
              >
                Sorted by Length
              </button>
            </div>
          </div>

          <label className="label">
            Choose good length:
            <select value={goodLength} onChange={changeLength}>
              {numbers.map(elem => (
                <option key={elem} value={elem + 1}>{elem + 1}</option>
              ))}
            </select>
          </label>
        </>
      )}
    </div>
  );
};

export default App;
