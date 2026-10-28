import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
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
  None = '',
  Alpha = 'alpha',
  Length = 'len',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const sort = () =>
    setSortType(sortType === SortType.Alpha ? SortType.None : SortType.Alpha);
  const sortLen = () =>
    setSortType(sortType === SortType.Length ? SortType.None : SortType.Length);
  const reverse = () => setIsReversed(!isReversed);
  const reset = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  const sortedList = [...goodsFromServer];

  if (sortType === SortType.Alpha) {
    sortedList.sort((a, b) => a.localeCompare(b));
  } else if (sortType === SortType.Length) {
    sortedList.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    sortedList.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.Alpha ? 'is-light' : ''}`}
          onClick={sort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortType.Length ? 'is-light' : ''}`}
          onClick={sortLen}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed === false ? 'is-light' : ''}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {sortType !== SortType.None || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {sortedList.map((product, i) => (
          <li data-cy="Good" key={i}>
            {product}
          </li>
        ))}
      </ul>
    </div>
  );
};
