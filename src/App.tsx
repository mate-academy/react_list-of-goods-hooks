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
  LENGTH,
  ALPHABET,
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((firstGood, secondGood) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return firstGood.localeCompare(secondGood);

      case SortType.LENGTH:
        return firstGood.length - secondGood.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isStarted, setStarted] = useState(false);
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const goods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="App">
      {!isStarted
        ? (
          <button
            type="button"
            onClick={() => setStarted(true)}
          >
            Start
          </button>
        )
        : (
          <>
            <button
              type="button"
              onClick={() => setSortType(SortType.ALPHABET)}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={() => setSortType(SortType.LENGTH)}
            >
              Sort by length
            </button>

            <button
              type="button"
              onClick={() => setReverse(!isReversed)}
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={() => {
                setSortType(SortType.NONE);
                setReverse(false);
              }}
            >
              Reset
            </button>

            <ul className="Goods">
              {goods.map((good) => (
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
