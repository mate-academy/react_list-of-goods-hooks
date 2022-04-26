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
  const [isVisible, setIsVisible] = useState(true);
  const [goods, setGoods] = useState(goodsFromServer);

  const notVisible = () => {
    setIsVisible((current) => !current);
  };

  const reverseGood = () => {
    setGoods((current) => [...current].reverse());
  };

  const sortedByAlphabet = () => {
    setGoods((current) => [...current].sort((a, b) => a.localeCompare(b)));
  };

  const sortedByLength = () => {
    setGoods((current) => [...current].sort((a, b) => a.length - b.length));
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
  };

  return (
    <div className="App">
      <h1 className="App__title">Goods</h1>
      {isVisible && (
        <button
          className="App__button"
          type="button"
          onClick={notVisible}
        >
          Start
        </button>
      )}
      <div className="App__block">
        {
          !isVisible && (
            <>
              <button onClick={reverseGood} type="button">
                Reverse
              </button>
              <button onClick={sortedByAlphabet} type="button">
                Sort alphabetically
              </button>
              <button onClick={sortedByLength} type="button">
                Sort by length
              </button>
              <button onClick={reset} type="button">
                Reset
              </button>
              <ul className="goods__list">
                {
                  goods.map(good => (
                    <li key={good} className="goods__item">
                      {good}
                    </li>
                  ))
                }
              </ul>
            </>
          )
        }
      </div>
    </div>
  );
};

export default App;
