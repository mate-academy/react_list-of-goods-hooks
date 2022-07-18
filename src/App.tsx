import { FC, useState } from 'react';
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

  visibleGoods.sort((good1, good2) => {
    switch (sortBy) {
      case SortType.Alpabet:
        return good1.localeCompare(good2);
      case SortType.Length:
        return good1.length - good2.length;
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
                onClick={() => setSortBy(SortType.Alpabet)}
              >
                Sort alphabetically
              </button>

              <button
                type="button"
                onClick={() => setSortBy(SortType.Length)}
              >
                Sort by length
              </button>

              <button
                type="button"
                onClick={() => setIsReversed(!isReversed)}
              >
                Reverse
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsReversed(false);
                  setSortBy(SortType.None);
                }}
              >
                Reset
              </button>
            </div>

            <ul className="Goods">
              {visibleGoods.map(good => (
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
