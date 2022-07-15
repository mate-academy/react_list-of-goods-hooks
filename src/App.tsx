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

  switch (sortType) {
    case SortType.ALPABET:
      visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SortType.LENGTH:
      visibleGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [sortBy, setSortBy] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    sortBy,
    isReversed,
  );

  return (
    <div className="App">
      {!isStarted
      && (
        <button
          className="btn btn--start"
          type="button"
          onClick={() => setIsStarted(true)}
        >
          Start
        </button>
      )}

      {isStarted
      && (
        <>
          <button
            className="btn"
            type="button"
            onClick={() => setSortBy(SortType.ALPABET)}
          >
            Sort alphabetically
          </button>

          <button
            className="btn"
            type="button"
            onClick={() => setSortBy(SortType.LENGTH)}
          >
            Sort by length
          </button>

          <button
            className="btn"
            type="button"
            onClick={() => setIsReversed(!isReversed)}
          >
            Reverse
          </button>

          <button
            className="btn"
            type="button"
            onClick={() => {
              setIsReversed(false);
              setSortBy(SortType.NONE);
            }}
          >
            Reset
          </button>

          <section className="list-section">
            <ul className="Goods">
              {visibleGoods.map(
                good => <li key={good} className="Goods__item">{good}</li>,
              )}
            </ul>

            <div className="ad">
              AD
            </div>
          </section>
        </>
      )}
    </div>
  );
};
