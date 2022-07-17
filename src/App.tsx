/* eslint-disable no-console */
import React, { useState } from 'react';
import './App.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const [startBtnState, changeStartBtnState] = useState(true);
  const [mainPartState, changeMainPartState] = useState(false);
  const [goods, changeGoods] = useState(goodsFromServer);

  function sortByLength(array: string[]) {
    return (array
      .sort((item1: string, item2: string) => item1.length - item2.length));
  }

  return (
    <div className="App">
      {
        startBtnState
        && (
          <button
            type="button"
            onClick={() => {
              changeStartBtnState(false);
              changeMainPartState(true);
            }}
          >
            Start
          </button>
        )
      }

      {
        mainPartState
        && (
          <div className="MainPart">
            <button
              type="button"
              onClick={() => {
                changeGoods([...goods].sort());
              }}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={() => {
                changeGoods(sortByLength([...goods]));
              }}
            >

              Sort by length
            </button>

            <button
              type="button"
              onClick={() => {
                changeGoods([...goods].reverse());
              }}
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={() => {
                changeGoods([...goodsFromServer]);
              }}
            >
              Reset
            </button>

            <ul className="Goods">
              {
                goods.map(good => (
                  <li className="Goods__item" key={good}>{good}</li>
                ))
              }
            </ul>
          </div>
        )
      }
    </div>
  );
};
