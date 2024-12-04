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
  Default = 'default',
  Alphabetically = 'alphabetically',
  Length = 'length',
}

export const App: React.FC = () => {
  const [sortMode, setSortMode] = useState<SortType>(SortType.Default);
  const [isReverse, setIsReverse] = useState<boolean>(false);
  const sorteredGoods: string[] = [...goodsFromServer].sort((a, b) => {
    if (sortMode === SortType.Alphabetically) {
      return a.localeCompare(b);
    } else if (sortMode === SortType.Length) {
      return a.length - b.length;
    }

    return 0;
  });

  const finalGoods: string[] = isReverse
    ? [...sorteredGoods].reverse()
    : sorteredGoods;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${!(sortMode === SortType.Alphabetically) && 'is-light'}`}
          onClick={() => {
            setSortMode(SortType.Alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${!(sortMode === SortType.Length) && 'is-light'}`}
          onClick={() => {
            setSortMode(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReverse && 'is-light'}`}
          onClick={() => {
            setIsReverse(!isReverse);
          }}
        >
          Reverse
        </button>
        {(sortMode !== SortType.Default || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReverse(false);
              setSortMode(SortType.Default);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {finalGoods.map((good: string) => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
