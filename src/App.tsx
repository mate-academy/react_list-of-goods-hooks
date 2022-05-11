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
  const [goods, setGoods] = useState(goodsFromServer);
  const [isVisible, setVisibility] = useState(true);

  const showList = () => {
    setVisibility(!isVisible);
  };

  const reverse = () => {
    setGoods([...goods].reverse());
  };

  const sort = () => {
    setGoods([...goods].sort(
      (a: string, b:string) => a.localeCompare(b),
    ));
  };

  const sortByLength = () => {
    setGoods([...goods].sort(
      (a, b) => a.length - b.length,
    ));
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
  };

  return (
    <div className="App">
      {isVisible ? (
        <button
          type="button"
          className="App__button App__button--start"
          onClick={showList}
        >
          Start
        </button>
      ) : (
        <div className="App__good">
          <h1 className="App__title">
            Goods
          </h1>
          <div className="App__buttons">
            <button
              type="button"
              className="App__button"
              onClick={reverse}
            >
              Reverse
            </button>

            <button
              type="button"
              className="App__button"
              onClick={sort}
            >
              Sort by alphabet
            </button>

            <button
              type="button"
              className="App__button"
              onClick={sortByLength}
            >
              Sort by length
            </button>

            <button
              type="button"
              className="App__button"
              onClick={reset}
            >
              Reset
            </button>
          </div>

          <ul className="GoodsList">
            {
              goods.map(good => (
                <li key={good} className="GoodsList__list">
                  {good}
                </li>
              ))
            }
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
