/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from 'react';
import './App.css';

const goodsFromServer = [
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
  None = 'none',
  Alpabet = 'alpabet',
  Length = 'length',
  Reverse = 'reverse',
}

export const App: FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState(SortType.None);

  const visibleGoods = [...goodsFromServer];

  visibleGoods.sort((firstGood, secondGood) => {
    switch (sortBy) {
      case SortType.Alpabet:
        return firstGood.localeCompare(secondGood);
      case SortType.Length:
        return firstGood.length - secondGood.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="App">
      {!isStarted
        ? (
          <button
            type="button"
            className="button button__start is-large is-primary"
            onClick={() => setIsStarted(!isStarted)}
          >
            Start
          </button>
        )
        : (
          <>
            <div className="buttons">
              <button
                type="button"
                className="button is-medium is-info"
                onClick={() => setSortBy(SortType.Alpabet)}
              >
                Sort alphabetically
              </button>

              <button
                type="button"
                className="button is-medium is-warning"
                onClick={() => setSortBy(SortType.Length)}
              >
                Sort by length
              </button>

              <button
                type="button"
                className="button is-medium is-danger is-light"
                onClick={() => setIsReversed(!isReversed)}
              >
                Reverse
              </button>

              <button
                type="button"
                className="button is-medium is-danger"
                onClick={() => {
                  setIsReversed(false);
                  setSortBy(SortType.None);
                }}
              >
                Reset
              </button>
            </div>

            <ul className="tags">
              {visibleGoods.map(good => (
                <li
                  className="tag is-info is-light is-large"
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
