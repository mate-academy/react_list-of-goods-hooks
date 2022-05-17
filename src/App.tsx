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

const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [isVisible, setIsVisible] = useState(false);
  const [length, setLength] = useState(1);

  const start = () => {
    setIsVisible(true);
  };

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { value } = e.currentTarget;
    const newList = [...goodsFromServer];

    setGoods(newList.filter(good => good.length >= +value));
    setLength(+value);
  };

  const reverse = () => {
    setGoods([...goods].reverse());
  };

  const sortAlphabetically = () => {
    setGoods([...goods].sort(
      (good1, good2) => good1.localeCompare(good2),
    ));
  };

  const sortByLength = () => {
    setGoods([...goods].sort(
      (good1, good2) => good1.length - good2.length,
    ));
  };

  const reset = () => {
    setGoods(goodsFromServer);
    setLength(1);
  };

  return (
    <div className="app">
      <h1 className="title">Goods</h1>
      {!isVisible && (
        <button
          type="button"
          onClick={start}
        >
          Start
        </button>
      )}

      {isVisible && (
        <>
          <div className="button-block">
            <button
              type="button"
              onClick={reverse}
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={sortAlphabetically}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={reset}
            >
              Reset
            </button>

            <button
              type="button"
              onClick={sortByLength}
            >
              Sort by length
            </button>

            <select
              className="select"
              value={length}
              onChange={onChange}
            >
              {goodsFromServer.map((good, index) => {
                return (
                  <option key={good} value={index + 1}>
                    {`Length >= ${index + 1}`}
                  </option>
                );
              })}
            </select>
          </div>
          <ul className="goods-list">
            {goods.map(good => {
              return (
                <li key={good} className="good">
                  {good}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
