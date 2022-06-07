import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './components/GoodsList/GoodsList';

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
  const [isVisible, setIsVisible] = useState(false);

  const showGoods = () => {
    setIsVisible(current => !current);
  };

  const hideGoods = () => {
    setIsVisible(current => !current);
    setGoods(goodsFromServer);
  };

  const reverseGoods = () => {
    setGoods(current => [...current].reverse());
  };

  const sortByAlphabet = () => {
    setGoods(current => [...current]
      .sort((a, b) => a.localeCompare(b)));
  };

  const sortByLength = () => {
    setGoods(current => [...current]
      .sort((a, b) => a.length - b.length));
  };

  const reset = () => {
    setGoods(goodsFromServer);
  };

  return (
    <div className="app">
      <h1 className="app__title">Goods</h1>
      {!isVisible
      && (
        <button
          type="button"
          className="btn"
          onClick={showGoods}
        >
          Start
        </button>
      )}

      {isVisible
      && (
        <section className="goods">
          <GoodsList goods={goods} />
          <div className="buttons">
            <button
              type="button"
              className="btn-item"
              onClick={reverseGoods}
            >
              Reverse
            </button>
            <button
              type="button"
              className="btn-item"
              onClick={reset}
            >
              Reset
            </button>
            <button
              type="button"
              className="btn-item"
              onClick={sortByAlphabet}
            >
              Sort alphabetically
            </button>
            <button
              type="button"
              className="btn-item"
              onClick={sortByLength}
            >
              Sort by length
            </button>
          </div>
        </section>
      )}

      {isVisible
      && (
        <button
          type="button"
          className="btn btn--hide"
          onClick={hideGoods}
        >
          End
        </button>
      )}
    </div>
  );
};

export default App;
