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
  ALPABET,
  LENGTH,
}

function getReorderedGoods(
  goods: string[],
  sortTypeInFuntion: SortType,
  isReversedInFunction: boolean,
) {
  const visibleGoods = [...goods];

  switch (true) {
    case sortTypeInFuntion === SortType.ALPABET:
      visibleGoods.sort();
      break;
    case sortTypeInFuntion === SortType.LENGTH:
      visibleGoods.sort((g1, g2) => g1.length - g2.length);
      break;
    default:
      break;
  }

  if (isReversedInFunction) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isStarted, setStart] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);

  return (
    <div className="App">
      <button
        type="button"
        onClick={() => setStart(!isStarted)}
        hidden={isStarted}
      >
        Start
      </button>

      {isStarted && (
        <>
          <button
            type="button"
            onClick={() => setSortType(SortType.ALPABET)}
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
              setReverse(false);
              setSortType(SortType.NONE);
            }}
          >
            Reset
          </button>

          <ul className="Goods">
            {getReorderedGoods(goodsFromServer, sortType, isReversed)
              .map(good => (
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
