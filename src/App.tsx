'use strict';

import { useState } from 'react';
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
  Alphabetically = 'alphabetically',
  Length = 'length',
  Default = '',
}

export const App = () => {
  let resetButton;
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  function toggleReverse() {
    setIsReversed(!isReversed);
  }

  if (sortField !== '' || isReversed) {
    resetButton = (
      <button
        type="button"
        className="button is-danger is-light"
        onClick={() => {
          setSortField(SortType.Default);
          setIsReversed(false);
        }}
      >
        Reset
      </button>
    );
  }

  function sorting(): string[] {
    let goodsList = [...goodsFromServer];

    switch (sortField) {
      case SortType.Alphabetically:
        goodsList = [...goodsFromServer].sort((a, b) => a.localeCompare(b));
        break;

      case SortType.Length:
        goodsList = [...goodsFromServer].sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      goodsList.reverse();
    }

    return goodsList;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.Alphabetically ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortType.Length ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {resetButton}
      </div>

      <ul>
        {sorting().map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
