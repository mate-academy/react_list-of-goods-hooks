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
  ALPHABET = 'Alphabet',
  LENGTH = 'Length',
}

export const App: React.FC = () => {
  const [isStarted, setStarted] = useState<boolean>(false);
  const [isReversed, setReversed] = useState<boolean>(false);
  const [sortBy, setSortType] = useState<SortType>(SortType.NONE);

  function getReorderedGoods(
    goods: string[],
    // sortBy: SortType,
    // isReversed: boolean,
  ): string[] {
    const visibleGoods = [...goods];

    switch (sortBy) {
      case SortType.ALPHABET:
        visibleGoods.sort((goodA, goodB) => goodA.localeCompare(goodB));

        break;

      case SortType.LENGTH:
        visibleGoods.sort((goodA, goodB) => goodA.length - goodB.length);

        break;

      default:
        break;
    }

    if (isReversed) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  }

  const sortedList = getReorderedGoods(goodsFromServer);

  const start = () => {
    setStarted(!isStarted);
  };

  const reverse = () => {
    setReversed(!isReversed);
  };

  const reset = () => {
    setSortType(SortType.NONE);
    setReversed(false);
  };

  return (
    <div className="App">
      <h1 className="App__title">
        List of Goods
      </h1>

      {!isStarted && (
        <button
          className="
            button
            button--start
          "
          type="button"
          onClick={start}
        >
          Start
        </button>
      )}

      {isStarted && (
        <div className="App__content">
          <div className="buttons">
            <button
              className="
                button
                button--sort-name
              "
              type="button"
              onClick={() => setSortType(SortType.ALPHABET)}
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
              onClick={reverse}
            >
              Reverse
            </button>

            <button
              className="button"
              type="button"
              onClick={reset}
            >
              Reset
            </button>
          </div>

          <ul
            className="Goods"
          >
            {sortedList.map(good => (
              <li className="Goods__item" key={good}>
                <p>{good}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
