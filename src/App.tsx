import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Default = '',
  Alphabetical = 'title',
  Length = 'length',
  Reverse = 'reverse',
}

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

export const App: React.FC = () => {
  const [isReverse, setIsReverse] = useState(false);
  const [sortOption, setSortOption] = useState<SortType>(SortType.Default);

  const goodsArr = [...goodsFromServer];

  if (sortOption == SortType.Length) {
    goodsArr.sort((a, b) => a.length - b.length);
  }

  if (sortOption == SortType.Alphabetical) {
    goodsArr.sort((a, b) => a.localeCompare(b));
  }

  if (isReverse) {
    goodsArr.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortOption !== SortType.Alphabetical ? 'is-light' : ''}`}
          onClick={() => setSortOption(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortOption !== SortType.Length ? 'is-light' : ''}`}
          onClick={() => setSortOption(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReverse && 'is-light'}`}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>
        {(isReverse || sortOption) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReverse(false);
              setSortOption(SortType.Default);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goodsArr.map((el, i) => (
            <li key={i} data-cy="Good">
              {el}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
