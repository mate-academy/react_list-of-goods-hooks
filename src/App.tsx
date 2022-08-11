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

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [start, setStart] = useState(false);
  const [sortBy, setSortBy] = useState(SortType.NONE);
  const [sortRevers, setSortRevers] = useState(false);

  const reset = () => {
    setSortBy(SortType.NONE);
    setSortRevers(false);
  };

  return (
    <div className="container">
      {(start === false)
        && (
          <button
            type="button"
            className="button"
            onClick={() => setStart(!start)}
          >
            Start
          </button>
        )}
      {start
        && (
          <div className="App">
            <div className="App__buttons">
              <button
                type="button"
                className="button"
                onClick={() => setSortBy(SortType.ALPABET)}
              >
                Sort alphabetically
              </button>

              <button
                type="button"
                className="button"
                onClick={() => setSortBy(SortType.LENGTH)}
              >
                Sort by length
              </button>

              <button
                type="button"
                className="button"
                onClick={() => setSortRevers(!sortRevers)}
              >
                Reverse
              </button>

              <button
                type="button"
                className="button"
                onClick={reset}
              >
                Reset
              </button>
            </div>
            <ul className="Goods">
              {getReorderedGoods(goodsFromServer, sortBy, sortRevers)
                .map(item => (
                  <li className="Goods__item" key={item}>{item}</li>
                ))}
            </ul>
          </div>
        )}
    </div>
  );
};
