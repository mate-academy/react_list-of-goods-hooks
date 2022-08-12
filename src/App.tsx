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

export const App: React.FC = () => {
  const [isStarted, setStarted] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReset, setReset] = useState(false);

  function getReorderedGoods(
    goods: string[],
  ) {
    // Not to mutate the original array
    const visibleGoods = [...goods];
    let x = isReversed;
    let y = sortType;

    if (isReset) {
      x = false;
      y = SortType.NONE;
    }

    visibleGoods.sort((a, b) => {
      switch (y) {
        case SortType.ALPABET:
          return a.localeCompare(b);
        case SortType.LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });

    if (x) {
      visibleGoods.reverse();
    }
    // Sort and reverse goods if needed
    // ...

    return visibleGoods;
  }

  const reorderList = getReorderedGoods(
    goodsFromServer,
  );

  return (
    <div className="App">
      {!isStarted && (
        <button
          type="button"
          onClick={() => setStarted(!isStarted)}
        >
          Start
        </button>
      )}

      {isStarted && (
        <>
          <button
            className="button"
            type="button"
            onClick={() => setSortType(SortType.ALPABET)}
          >
            Sort alphabetically
          </button>
          <button
            className="button"
            type="button"
            onClick={() => setSortType(SortType.LENGTH)}
          >
            Sort by length
          </button>
          <button
            className="button"
            type="button"
            onClick={() => setReversed(!isReversed)}
          >
            Reverse
          </button>
          <button
            className="button"
            type="button"
            onClick={() => setReset(!isReset)}
          >
            Reset
          </button>
          <ul className="Goods">
            {reorderList.map(el => (
              <li className="Goods__item">
                {el}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
