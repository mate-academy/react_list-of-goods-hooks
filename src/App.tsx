import React, { useState } from 'react';
import './App.css';
import 'bulma/css/bulma.min.css';

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
  ALPABET,
  LENGTH,
}

const getReorderedGoods = (
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) => {
  const visibleGoods = [...goods];

  visibleGoods.sort((g1, g2) => {
    switch (sortType) {
      case SortType.ALPABET:
        return g1.localeCompare(g2);

      case SortType.LENGTH:
        return g1.length - g2.length;

      default:
        return 0;
    }
  });

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
};

export const App: React.FC = () => {
  const [isStarted, setStarted] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const start = () => {
    setStarted(true);
  };

  const sortByLength = () => (
    setSortType(SortType.LENGTH)
  );

  const sortAlphabetically = () => (
    setSortType(SortType.ALPABET)
  );

  const reverse = () => (
    setReversed(!isReversed)
  );

  const reset = () => {
    setSortType(SortType.NONE);
    setReversed(false);
  };

  const goods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  return (
    <div className="App">
      {!isStarted && (
        <button
          type="button"
          className="button is-dark"
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
              className="button is-light"
              onClick={sortAlphabetically}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className="button is-light"
              onClick={sortByLength}
            >
              Sort by length
            </button>

            <button
              type="button"
              className="button is-light"
              onClick={reverse}
            >
              Reverse
            </button>

            <button
              type="button"
              className="button is-light"
              onClick={reset}
            >
              Reset
            </button>
          </div>

          <ul className="Goods">
            {
              goods.map(good => (
                <li key={good} className="Goods__item">{good}</li>
              ))
            }
          </ul>
        </>
      )}
    </div>
  );
};
