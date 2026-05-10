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

export enum SortType {
  Alphabetically = 'alphabetically',
  Length = 'length',
  Default = '',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = [...goodsFromServer];

  if (sortField === SortType.Alphabetically) {
    visibleGoods.sort((a: string, b: string) => a.localeCompare(b));
  }

  if (sortField === SortType.Length) {
    visibleGoods.sort((a: string, b: string) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
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
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
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
        )}
      </div>

      <ul>
        {visibleGoods.map((item: string) => {
          return (
            <li key={item} data-cy="Good">
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
