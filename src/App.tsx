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
  NONE = 'None',
  ALPABET = 'Alpabet',
  LENGTH = 'Length',
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPABET:
        return good1.localeCompare(good2);

      case SortType.LENGTH:
        return good1.length - good2.length;

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
  const [isStarted, setStart] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setReversed] = useState(false);

  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  return (
    <div className="App">
      {!isStarted ? (
        <button
          type="button"
          className="button button--start"
          onClick={() => setStart(true)}
        >
          Start
        </button>
      ) : (
        <>
          <div className="buttons">
            <button
              type="button"
              className="button"
              onClick={() => setSortType(SortType.ALPABET)}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className="button"
              onClick={() => setSortType(SortType.LENGTH)}
            >
              Sort by length
            </button>

            <button
              type="button"
              className="button"
              onClick={() => setReversed(value => !value)}
            >
              Reverse
            </button>

            <button
              type="button"
              className="button"
              onClick={() => {
                setSortType(SortType.NONE);
                setReversed(false);
              }}
            >
              Reset
            </button>
          </div>

          <ul className="Goods">
            {visibleGoods.map(good => (
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
