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
  Default = '',
  Alphabetically = 'alphabetically',
  Length = 'length',
}

function getSortedGoods(isReversed: boolean, currentSort: SortType) {
  const copiedGoods = [...goodsFromServer];

  switch (currentSort) {
    case SortType.Default:
      break;

    case SortType.Alphabetically:
      copiedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SortType.Length:
      copiedGoods.sort((a, b) => a.length - b.length);
      break;
  }

  if (isReversed) {
    copiedGoods.reverse();
  }

  return copiedGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [currentSort, setCurrentSort] = useState(SortType.Default);

  const sortedGoods = getSortedGoods(isReversed, currentSort);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${currentSort === SortType.Alphabetically ? '' : 'is-light'}`}
          onClick={() => setCurrentSort(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${currentSort === SortType.Length ? '' : 'is-light'}`}
          onClick={() => setCurrentSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {(currentSort !== SortType.Default || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setCurrentSort(SortType.Default);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {sortedGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
