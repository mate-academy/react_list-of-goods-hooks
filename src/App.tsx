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

const App: React.FC = () => {
  const [isVisible, setVisibility] = useState(true);
  const [goods, setGoods] = useState(goodsFromServer);

  const toggleVisability = () => {
    setVisibility((current) => !current);
  };

  const reverse = () => {
    setGoods((current) => [...current].reverse());
  };

  const sortByAlphabet = () => {
    setGoods((current) => [...current].sort((a, b) => a.localeCompare(b)));
  };

  const sortByLength = () => {
    setGoods((current) => [...current].sort((a, b) => a.length - b.length));
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
  };

  return (
    <div className="app">
      <h1 className="app__title">Goods</h1>
      {isVisible && (
        <button
          className="app__button"
          type="button"
          onClick={toggleVisability}
        >
          Show
        </button>
      )}
      <div className="app__block">
        {!isVisible && (
          <>
            <button
              onClick={reverse}
              type="button"
              className="app__button"
            >
              Reverse
            </button>
            <button
              onClick={sortByAlphabet}
              type="button"
              className="app__button"
            >
              Sort by alphabet
            </button>
            <button
              onClick={sortByLength}
              type="button"
              className="app__button"
            >
              Sort by length
            </button>
            <button
              onClick={reset}
              type="button"
              className="app__button"
            >
              Reset
            </button>
            <ul className="app__list">
              {
                goods.map(good => (
                  <li key={good} className="app__item">
                    {good}
                  </li>
                ))
              }
            </ul>
          </>
        )}
      </div>
    </div>

  );
};

export default App;
