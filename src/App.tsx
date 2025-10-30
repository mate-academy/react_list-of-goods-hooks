import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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
  None = 'NONE',
  ByAlphabet = 'BY_ALPHABET',
  ByLength = 'BY_LENGTH',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  let currentList: string[] = [...goodsFromServer];
  let initialOrder = true;

  const handleSortByAlphabet = () => {
    setSortType(SortType.ByAlphabet);
    setIsReversed(false);
  };

  const handleSortByLength = () => {
    setSortType(SortType.ByLength);
    setIsReversed(false);
  };

  const handleToggleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  if (sortType === SortType.ByAlphabet) {
    currentList = [...currentList].sort(
      (item1, item2) => item1.localeCompare(item2),
      // eslint-disable-next-line function-paren-newline
    );
  }

  if (sortType === SortType.ByLength) {
    currentList = [...currentList].sort(
      (item1, item2) => item1.length - item2.length,
    );
  }

  if (isReversed) {
    currentList = [...currentList].reverse();
  }

  if (sortType === SortType.None && !isReversed) {
    initialOrder = false;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortType === SortType.ByAlphabet
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={handleSortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortType === SortType.ByLength
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed === true
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={handleToggleReverse}
        >
          Reverse
        </button>

        {initialOrder === true && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {[...currentList].map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
