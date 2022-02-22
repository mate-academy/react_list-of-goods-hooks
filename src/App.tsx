import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './GoodList';

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
  const [isVisible, setIsVisible] = useState(false);

  const visibleGoods = [...goods];

  const start = () => {
    setIsVisible(true);
  };

  const reverse = () => {
    setGoods(prev => [...prev.reverse()]);
  };

  const sortAlphabet = () => {
    setGoods(prev => [...prev.sort((a, b) => a.localeCompare(b))]);
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
  };

  const stop = () => {
    setIsVisible(false);
    reset();
  };

  const sortByLength = () => {
    setGoods(prev => [...prev].sort((a, b) => a.length - b.length));
  };

  return (
    <div className="App">
      <h1>Goods</h1>
      {!isVisible ? (
        <button
          type="button"
          onClick={start}
        >
          Start
        </button>

      ) : (
        <button
          type="button"
          onClick={stop}
        >
          Stop
        </button>
      )}
      {isVisible
          && (
            <div>
              <button
                type="button"
                onClick={reverse}
              >
                reverse
              </button>
              <button
                type="button"
                onClick={sortAlphabet}
              >
                Sort in AlphaBet
              </button>
              <button
                type="button"
                onClick={sortByLength}
              >
                sort by length
              </button>
              <button
                type="button"
                onClick={reset}
              >
                Reset
              </button>

              <GoodsList goodsList={visibleGoods} />
            </div>
          )}
    </div>
  );
};
