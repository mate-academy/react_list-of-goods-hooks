import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './GoodsList';

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

enum SortBy {
  default,
  alphabet,
  length,
}

export const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState(SortBy.default);

  const start = () => setIsStarted(true);
  const reverse = () => setIsReversed(!isReversed);
  const setSortMethod = (by: SortBy) => setSortBy(by);
  const reset = () => {
    setIsReversed(false);
    setSortBy(SortBy.default);
  };

  const setGoods = (initialGoods: string[]) => {
    const preparedGoods = [...initialGoods];

    preparedGoods.sort((a, b) => {
      switch (sortBy) {
        case SortBy.alphabet:
          return a.localeCompare(b);
        case SortBy.length:
          return a.length - b.length;
        case SortBy.default:
        default:
          return 0;
      }
    });

    if (isReversed) {
      preparedGoods.reverse();
    }

    return preparedGoods;
  };

  const goods = setGoods(goodsFromServer);

  return (
    <div className="App">
      <h1>Goods</h1>
      {!isStarted
        ? <button type="button" onClick={start}>start</button>
        : (
          <>
            <button type="button" onClick={reverse}>
              reverse
            </button>

            <button type="button" onClick={() => setSortMethod(SortBy.alphabet)}>
              sort by abc
            </button>

            <button type="button" onClick={() => setSortMethod(SortBy.length)}>
              sort by len
            </button>

            <button type="button" onClick={reset}>
              reset
            </button>

            <GoodsList goods={goods} />
          </>
        )}
    </div>
  );
};
