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

export const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [isVisible, setVisibility] = useState(false);

  const showGoods = () => {
    setVisibility(!isVisible);
  };

  const reverse = () => {
    setGoods([...goods].reverse());
  };

  const sort = (sortBy: string) => {
    const sortedGoods = [...goods];

    sortedGoods.sort((goodA, goodB) => {
      switch (sortBy) {
        case 'alpha':
          return goodA.localeCompare(goodB);

        case 'length':
          return goodA.length - goodB.length;

        default:
          return 0;
      }
    });

    return setGoods(sortedGoods);
  };

  const reset = () => {
    setGoods(goodsFromServer);
  };

  return (
    <div className="app">
      <h1>List of Goods</h1>
      {!isVisible
        ? (
          <button
            type="button"
            onClick={showGoods}
          >
            Start
          </button>
        )
        : (
          <>
            <div className="wrapper">
              <div className="buttons">
                <button
                  type="button"
                  className="button"
                  onClick={reverse}
                >
                  Reverse
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={() => sort('alpha')}
                >
                  Sort alphabetically
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={() => sort('length')}
                >
                  Sort by length
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={reset}
                >
                  Reset
                </button>
              </div>
              <ul>
                {goods.map(good => (
                  <li key={good}>
                    {good}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
    </div>
  );
};
