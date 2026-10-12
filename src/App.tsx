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
  None = 'none',
  Alphabetically = 'alphabetically',
  Length = 'length',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const goods = [...goodsFromServer];

  switch (sortType) {
    case SortType.Alphabetically:
      goods.sort((a, b) => a.localeCompare(b));
      break;

    case SortType.Length:
      goods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    goods.reverse();
  }

  const isOriginal = sortType === SortType.None && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info
            ${sortType === SortType.Alphabetically ? '' : 'is-light'}`}
          onClick={() => {
            setSortType(SortType.Alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success
            ${sortType === SortType.Length ? '' : 'is-light'}`}
          onClick={() => {
            setSortType(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning
            ${isReversed ? '' : 'is-light'}`}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {!isOriginal && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortType(SortType.None);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
