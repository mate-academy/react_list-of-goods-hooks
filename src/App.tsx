import { useState } from 'react';
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
  none,
  name,
  length,
}

export const App = () => {
  const [isVisible, setListVisible] = useState(false);
  const [isSorted, setListSorted] = useState(SortType.none);
  const [isReversed, setListReversed] = useState(false);
  const goods = [...goodsFromServer];

  switch (isSorted) {
    case SortType.name:
      goods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SortType.length:
      goods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    goods.reverse();
  }

  const handleListVisible = () => setListVisible(!isVisible);
  const handleSortByName = () => setListSorted(SortType.name);
  const handleSortByLength = () => setListSorted(SortType.length);
  const handleReset = () => {
    setListReversed(false);
    setListSorted(SortType.none);
  };

  const handleReverse = () => setListReversed(!isReversed);

  return (
    <div className="App">
      {!isVisible && (
        <button
          type="button"
          className="button"
          onClick={handleListVisible}
        >
          Start
        </button>
      )}

      {isVisible && (
        <div>
          <button
            type="button"
            className="button"
            onClick={handleSortByName}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className="button"
            onClick={handleSortByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className="button"
            onClick={handleReverse}
          >
            Reverse
          </button>

          <button
            type="button"
            className="button"
            onClick={handleReset}
          >
            Reset
          </button>

          <div className="goods">
            <ul>
              {goods.map(good => (
                <li
                  className="goods__item"
                  key={good}
                >
                  {good}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
