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
  none,
  alphabet,
  length,
}

function newList(
  sortBy: SortType,
  oldGoods: string[],
  valueReverse: boolean,
) {
  const goods = [...oldGoods];

  goods.sort((good1, good2) => {
    switch (sortBy) {
      case SortType.alphabet:
        return good1.localeCompare(good2);
      case SortType.length:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (valueReverse) {
    goods.reverse();
  }

  if (sortBy === SortType.none) {
    goodsFromServer.map(good => good);
  }

  return goods;
}

export const App: React.FC = () => {
  const [valueStart, setValueStart] = useState(true);
  const [sortBy, setSortBy] = useState(SortType.none);
  const [valueReverse, setValueReverse] = useState(false);

  const visibleGoods = newList(sortBy, goodsFromServer, valueReverse);

  return (
    <div className="App">
      <div className="App__container">
        {valueStart && (
          <button
            type="button"
            className="button is-info button__start"
            onClick={() => setValueStart(false)}
          >
            Start
          </button>
        )}
      </div>

      {!valueStart && (
        <>
          <div className="App__container">
            <button
              type="button"
              className="button is-rounded"
              onClick={() => setSortBy(SortType.alphabet)}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className="button is-rounded"
              onClick={() => setSortBy(SortType.length)}
            >
              Sort by length
            </button>

            <button
              type="button"
              className="button is-rounded"
              onClick={() => setValueReverse(!valueReverse)}
            >
              Reverse
            </button>

            <button
              type="button"
              className="button is-success button__reset"
              onClick={() => {
                setSortBy(SortType.none);
                setValueReverse(false);
              }}
            >
              Reset
            </button>
          </div>

          <div className="list">
            <ul className="Goods">
              {visibleGoods.map(good => (
                <li
                  key={good}
                  className="Goods__item"
                >
                  {good}
                </li>
              ))}
            </ul>
          </div>

        </>
      )}
    </div>
  );
};
