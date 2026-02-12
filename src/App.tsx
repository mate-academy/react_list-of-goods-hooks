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
  Alphabetically = 'Alphabetically',
  ByLength = 'ByLength',
  None = 'None',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const VisibleGoods = [...goodsFromServer].sort((a, b) => {
    if (sortType === SortType.Alphabetically) {
      return a.localeCompare(b);
    }

    if (sortType === SortType.ByLength) {
      return a.length - b.length;
    }

    return 0;
  });

  if (isReversed) {
    VisibleGoods.reverse();
  }

  const isResetVisible = sortType !== SortType.None || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortType === SortType.Alphabetically
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortType(SortType.Alphabetically)}
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
          onClick={() => setSortType(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => setIsReversed(current => !current)}
        >
          Reverse
        </button>
        {isResetVisible && (
          <button
            type="button"
            className="button is-danger is-light"
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
        {VisibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
