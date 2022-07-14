import React, { useState } from 'react';
import { GoodList } from './component/goodList';

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

export const App: React.FC = () => {
  const [reversed, setReverse] = useState(false);
  const [startButton, setStartButton] = useState(false);
  const [sort, setSort] = useState('');
  const [lengthLimit, setLimit] = useState(0);
  const wordLength = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const visibleGoods = [...goodsFromServer]
    .filter(good => good.length >= lengthLimit);

  visibleGoods.sort((g1, g2) => {
    switch (sort) {
      case 'Alf':
        return g1.localeCompare(g2);
      case 'length':
        return g1.length - g2.length;

      default:
        return 0;
    }
  });

  if (reversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="App">
      {!startButton
        ? (
          <button
            type="button"
            className="button is-warning button--size"
            onClick={() => setStartButton(true)}
          >
            START
          </button>
        )
        : undefined}
      {startButton && <GoodList goods={visibleGoods} />}
      <div className="button__flex">
        {startButton && (
          <button
            className="button is-success"
            type="button"
            onClick={() => setReverse(true)}
          >
            REVERSE
          </button>
        )}
        {startButton && (
          <button
            className="button is-success"
            type="button"
            onClick={() => setSort('Alf')}
          >
            Sort alphabetically
          </button>
        )}
        {startButton && (
          <button
            className="button is-success"
            type="button"
            onClick={() => setSort('length')}
          >
            Sort by length
          </button>
        )}
        {startButton && (
          <button
            className="button is-success"
            type="button"
            onClick={() => {
              return (
                setSort(''),
                setReverse(false),
                setLimit(0)
              );
            }}
          >
            Reset
          </button>
        )}
        {startButton && (
          <div className="select is-success">
            <select
              value={lengthLimit}
              onChange={(element) => setLimit(+element.target.value)}
            >
              {wordLength
                .map(digit => (
                  <option
                    value={digit}
                    key={digit}
                  >
                    {digit}
                  </option>
                ))}
            </select>
          </div>

        )}
      </div>
    </div>
  );
};
