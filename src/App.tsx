/* eslint-disable @typescript-eslint/no-unused-vars */
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

const randomValues = new Array(goodsFromServer.length)
  .fill(1).map(x => x + Math.random());

export const App: React.FC = () => {
  const [start, setStart] = useState(false);
  const [sortType, setSortType] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [minLength, setLength] = useState(1);

  function getReorderedGoods() {
    const visibleGoods = [...goodsFromServer].filter(good => (
      good.length > minLength
    ));

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

  const resetSort = () => {
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
          <label>
            Choose a length
            <select
              onChange={(event) => setLength(+event.target.value)}
            >
              {(new Array(10)).fill(0).map((_, index) => (
                <option
                  value={index + 1}
                  key={randomValues[index]}
                >
                  {index + 1}
                </option>
              ))}
            </select>
          </label>
          <br />
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
            onClick={resetSort}
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
