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
  const [isStarted, setStarted] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState('none');

  const goods = [...goodsFromServer];

  goods.sort((prev, next) => {
    switch (sortType) {
      case 'alph':
        return prev.localeCompare(next);
      case 'length':
        return prev.length - next.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    goods.reverse();
  }

  const start = () => {
    setStarted(true);
  };

  const reverse = () => {
    setReversed(!isReversed);
  };

  const reset = () => {
    setReversed(false);
    setSortType('none');
  };

  const sortAlph = () => {
    setSortType('alph');
  };

  const sortLength = () => {
    setSortType('length');
  };

  return (
    <div className="App">
      {!isStarted
        ? (
          <button
            type="button"
            onClick={start}
          >
            Start
          </button>
        )
        : (
          <>
            <button
              type="button"
              onClick={sortAlph}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={sortLength}
            >
              Sort by length
            </button>

            <button
              type="button"
              onClick={reverse}
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
              {goods.map(good => (
                <li className="Goods__item" key={good}>{good}</li>
              ))}
            </ul>
          </>
        )}
    </div>
  );
};
