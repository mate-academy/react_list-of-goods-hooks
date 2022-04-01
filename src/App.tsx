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
  const [isVisible, setIsVisible] = useState(false);

  const showList = () => {
    setIsVisible(!isVisible);
  };

  const sortReverse = () => {
    setGoods([...goods].reverse());
  };

  const sort = (by: string) => {
    const newGoods = [...goods];

    newGoods.sort((goodA, goodB) => {
      switch (by) {
        case 'alph':
          return goodA.localeCompare(goodB);

        case 'len':
          return goodA.length - goodB.length;

        default:
          return 0;
      }
    });

    return setGoods(newGoods);
  };

  const reset = () => {
    setGoods(goodsFromServer);
  };

  return (
    <div className="app">
      <h1>List of Goods</h1>
      { !isVisible
        ? (
          <button
            type="button"
            onClick={showList}
          >
            Start
          </button>
        )
        : (
          <>
            <button
              type="button"
              onClick={sortReverse}
            >
              Reverse
            </button>
            <button
              type="button"
              onClick={() => sort('alph')}
            >
              Sort alphabetically
            </button>
            <button
              type="button"
              onClick={() => sort('len')}
            >
              Sort by Length
            </button>
            <button
              type="button"
              onClick={reset}
            >
              Reset
            </button>
            <ul>
              {goods.map(good => (
                <li
                  key={good}
                  className="list"
                >
                  {good}
                </li>
              ))}
            </ul>
          </>
        )}
    </div>
  );
};
