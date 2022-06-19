import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './GoodsList';

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
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [started, setStarted] = useState(false);

  return (
    <div className="App">
      <h1 className="title has-text-centered">
        List of Goods
      </h1>
      {!started && (
        <div className="container has-text-centered">
          <button
            type="button"
            className="button is-success is-outlined is-rounded is-large"
            onClick={() => setStarted(true)}
          >
            Start
          </button>
        </div>
      )}
      {started && (
        <>
          <GoodsList goods={visibleGoods} />
          <div className="level buttons is-centered">
            <button
              type="button"
              className="button level-item has-text-centered is-warning"
              onClick={() => setVisibleGoods([...visibleGoods].reverse())}
            >
              Reverse
            </button>
            <button
              type="button"
              className="
                button
                level-item
                has-text-centered
                is-primary
                has-addons
                is-outlined"
              onClick={() => setVisibleGoods([...visibleGoods]
                .sort((current, prev) => current.localeCompare(prev)))}
            >
              Sort abc
            </button>
            <button
              type="button"
              className="
                button
                level-item
                has-text-centered
                is-primary
                has-addons
                is-outlined"
              onClick={() => setVisibleGoods([...visibleGoods]
                .sort((current, prev) => prev.length - current.length))}
            >
              Sort by length
            </button>
          </div>
          {visibleGoods !== goodsFromServer && (
            <div className="container has-text-centered">
              <button
                type="button"
                className="
                  button
                  is-danger
                  is-outlined
                  is-rounded
                  is-large"
                onClick={() => setVisibleGoods(goodsFromServer)}
              >
                Reset
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
