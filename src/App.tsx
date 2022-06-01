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
  const [startVisible, setStartVisible] = useState(false);
  const [goods, setGoods] = useState(goodsFromServer);

  const setReverseGood = () => {
    setGoods(good => [...good].reverse());
  };

  const setSortAlphabetically = () => {
    setGoods(good => [...good].sort((a, b) => a.localeCompare(b)));
  };

  const setSortByLength = () => {
    setGoods(good => [...good].sort((a, b) => (a.length - b.length)));
  };

  const setReset = () => {
    setGoods([...goodsFromServer]);
  };

  return startVisible
    ? (
      <div className="app">
        <h1 className="app__title">Goods</h1>
        <ul>
          {
            goods.map(good => (
              <li
                key={good}
                className="goods__item"
              >
                {good}
              </li>
            ))
          }
        </ul>

        <button
          type="button"
          className="button button__reverse"
          onClick={setReverseGood}
        >
          ReverseGood
        </button>

        <button
          type="button"
          className="button button__sort"
          onClick={setSortAlphabetically}
        >
          SortAlphabetically
        </button>

        <button
          type="button"
          className="button button__length"
          onClick={setSortByLength}
        >
          SortByLength
        </button>
        <div className="button__reset">
          <button
            type="button"
            className="button"
            onClick={setReset}
          >
            Reset
          </button>
        </div>
      </div>
    )
    : (
      <button
        type="button"
        className="button"
        onClick={() => setStartVisible(true)}
      >
        Start
      </button>
    );
};

export default App;
