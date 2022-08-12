import React, { useCallback, useMemo, useState } from 'react';
import './App.css';

const goodsFromServer = [
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

  const callbackToSort = useCallback(() => (
    (
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
    }
  ), [sortType, isReversed]);

  const sortGoods = callbackToSort();

  const start = () => (
    setStarted(true)
  );

  const sortAlphabetically = () => (
    setSortType(SortType.ALPHABET)
  );

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reverse = () => (
    setReversed(!isReversed)
  );

  const reset = () => {
    setSortType(SortType.NONE);
    setReversed(false);
  };

  const goods = useMemo(() => (
    sortGoods(goodsFromServer, sortType, isReversed)
  ), [sortType, isReversed]);

  return (
    <div className="App">
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
              className={sortType === SortType.ALPHABET
                ? 'button is-info'
                : 'button is-info is-outlined'}
              onClick={sortAlphabetically}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={sortByLength}
              className={sortType === SortType.LENGTH
                ? 'button is-info'
                : 'button is-info is-outlined'}
            >
              Sort by length
            </button>

            <button
              type="button"
              onClick={reverse}
              className={!isReversed
                ? 'button is-info is-outlined'
                : 'button is-info'}
            >
              Reverse
            </button>

            <button
              type="button"
              className="button is-warning button-reset"
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
