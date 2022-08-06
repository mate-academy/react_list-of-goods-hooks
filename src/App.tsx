import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
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

enum SortType {
  NONE,
  ALPABET,
  LENGTH,
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  if (sortType !== SortType.NONE) {
    visibleGoods.sort((a, b) => {
      switch (sortType) {
        case SortType.ALPABET:
          return a.localeCompare(b);
        case SortType.LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  return isReversed ? visibleGoods.reverse() : visibleGoods;
}

export const App: React.FC = () => {
  const [isStarted, showList] = useState(false);
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const show = () => showList(true);
  const reverse = () => setReverse(!isReversed);
  const sortByAlpabet = () => setSortType(SortType.ALPABET);
  const sortByLength = () => setSortType(SortType.LENGTH);
  const setDefault = () => {
    setSortType(SortType.NONE);
    setReverse(false);
  };

  const goods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  return (
    <div className="App block box">
      {!isStarted
        ? (
          <button
            type="button"
            onClick={show}
            className="button is-success is-rounded"
          >
            Start
          </button>
        )
        : (
          <div className="block">
            <button
              type="button"
              onClick={sortByAlpabet}
              className="button is-primary is-light is-rounded mx-2"
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={sortByLength}
              className="button is-primary is-light is-rounded mx-2"
            >
              Sort by length
            </button>

            <button
              type="button"
              onClick={reverse}
              className="button is-primary is-light is-rounded mx-2"
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={setDefault}
              className="button is-primary is-light is-rounded mx-2"
            >
              Reset
            </button>

            <ul className="Goods table">
              {goods.map(good => {
                return (
                  <li key={good} className="Goods__item subtitle is-5">
                    {good}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
    </div>
  );
};
