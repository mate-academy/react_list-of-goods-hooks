import React, { useState } from 'react';
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
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  const reset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="App">
      {!isStarted && (
        <button
          type="button"
          className="button is-primary button-start"
          onClick={() => setIsStarted(true)}
        >
          Start
        </button>
      )}

      {isStarted && (
        <div className="box">
          <ul className="Goods">
            {visibleGoods.map(good => (
              <li className="Goods__item" key={good}>
                {good}
              </li>
            ))}
          </ul>

          <div className="buttons">
            <button
              type="button"
              className="button is-primary"
              onClick={() => setSortType(SortType.ALPHABET)}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className="button is-primary"
              onClick={() => setSortType(SortType.LENGTH)}
            >
              Sort by length
            </button>

            <button
              type="button"
              className="button is-primary"
              onClick={() => setIsReversed(!isReversed)}
            >
              Reverse
            </button>

            <button
              type="button"
              className="button is-primary"
              onClick={reset}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
