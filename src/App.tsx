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

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

export const App: React.FC = () => {
  const [isStarted, setStarted] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const sortGoods = (
    goods: string[],
    typeOfSort: SortType,
    isReverse: boolean,
  ) => {
    const visibleGoods = [...goods];

    visibleGoods.sort((a, b) => {
      switch (typeOfSort) {
        case SortType.ALPHABET:
          return a.localeCompare(b);
        case SortType.LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });

    return isReverse
      ? visibleGoods.reverse()
      : visibleGoods;
  };

  const start = () => (
    setStarted(true)
  );

  const sortAlphabetically = () => (
    setSortType(SortType.ALPHABET)
  );

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const revers = () => (
    setReversed(!isReversed)
  );

  const reset = () => {
    setSortType(SortType.NONE);
    setReversed(false);
  };

  const goods = sortGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="App is-light">
      {!isStarted && (
        <button
          type="button"
          className="button is-success button-start"
          onClick={start}
        >
          Start
        </button>
      )}

      {isStarted && (
        <>
          <div className="buttons">
            <button
              type="button"
              className="button is-dark"
              onClick={sortAlphabetically}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className="button is-dark"
              onClick={sortByLength}
            >
              Sort by length
            </button>

            <button
              type="button"
              className="button is-dark"
              onClick={revers}
            >
              Reverse
            </button>

            <button
              type="button"
              className="button is-danger button-reset"
              onClick={reset}
            >
              Reset
            </button>
          </div>

          <ul className="Goods">
            {goods.map(good => (
              <li className="Goods__item" key={good}>
                {good}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
