/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const [start, setStart] = useState(false);
  const [sortType, setSortType] = useState(0);
  const [reverse, setReverse] = useState(false);

  function getReorderedGoods() {
    const visibleGoods = goodsFromServer;

    // eslint-disable-next-line no-console
    console.log('fdjf');
    visibleGoods.sort((item1, item2) => {
      switch (sortType) {
        case 1:
          return item1.localeCompare(item2);
        case 2:
          return item1.length - item2.length;
        case 0:
        default:
          return 0;
      }
    });

    return reverse
      ? visibleGoods.reverse()
      : visibleGoods;
  }

  const startSort = () => {
    setStart(true);
  };

  const alpabetSort = () => {
    setSortType(1);
  };

  const lengthSort = () => {
    setSortType(2);
  };

  const reverseSort = () => {
    setReverse(!reverse);
  };

  const reset = () => {
    setSortType(0);
    setReverse(false);
  };

  return (
    <div className="App">
      {!start && (
        <button
          type="button"
          onClick={startSort}
        >
          Start
        </button>
      )}

      {start && (
        <>
          <button
            type="button"
            onClick={alpabetSort}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            onClick={lengthSort}
          >
            Sort by length
          </button>

          <button
            type="button"
            onClick={reverseSort}
          >
            Reverse
          </button>

          <button
            type="button"
            onClick={reset}
          >
            Reset
          </button>

          <ul className="Goods">
            {getReorderedGoods().map(good => (
              <li
                className="Goods__item"
                key={good}
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
