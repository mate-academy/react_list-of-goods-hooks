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
  const [isReversed, setIsReversed] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
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

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="App">
      {!isStarted
        ? (
          <button
            type="button"
            className="button is-warning button--size"
            onClick={() => setIsStarted(true)}
          >
            START
          </button>
        )
        : undefined}
      {isStarted && <GoodList goods={visibleGoods} />}

      <div className="button__flex">
        {isStarted && (
          <button
            className="button is-success"
            type="button"
            onClick={() => setIsReversed(true)}
          >
            REVERSE
          </button>
        )}
        {isStarted && (
          <button
            className="button is-success"
            type="button"
            onClick={() => setSort('Alf')}
          >
            Sort alphabetically
          </button>
        )}
        {isStarted && (
          <button
            className="button is-success"
            type="button"
            onClick={() => setSort('length')}
          >
            Sort by length
          </button>
        )}
        {isStarted && (
          <button
            className="button is-success"
            type="button"
            onClick={() => {
              return (
                setSort(''),
                setIsReversed(false),
                setLimit(0)
              );
            }}
          >
            Reset
          </button>
        )}
        {isStarted && (
          <div className="select is-multiple">
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
