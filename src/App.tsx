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
  ALPHABET,
  LENGTH,
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPHABET:
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
    <div className="App level is-primary">
      {!isStarted ? (
        <button
          className="button is-success"
          type="button"
          onClick={() => setStart(true)}
        >
          Start
        </button>
      ) : (
        <>
          <div className="container">
            <button
              className="button is-success"
              type="button"
              onClick={() => setSortType(SortType.ALPHABET)}
            >
              Sort alphabetically
            </button>
            <button
              className="button is-info"
              type="button"
              onClick={() => setSortType(SortType.LENGTH)}
            >
              Sort by length
            </button>
            <button
              className="button is-warning"
              type="button"
              onClick={() => setReversed(value => !value)}
            >
              Reverse
            </button>
            <button
              className="button is-danger"
              type="button"
              onClick={() => {
                setSortType(SortType.NONE);
                setReversed(false);
              }}
            >
              Reset
            </button>
          </div>
          <ul className="Goods level">
            {visibleGoods.map(good => (
              <li className="Goods__item level-item" key={good}>
                <span className="subtitle">
                  {good}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
