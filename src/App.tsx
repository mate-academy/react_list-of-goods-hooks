import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

enum SortType {
  None = '',
  Alphabetical = 'alphabetically',
  Length = 'length',
}

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

export const App: React.FC = () => {
  let goods: string[] = [...goodsFromServer];
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const isReset: boolean = sortType !== SortType.None || isReversed;

  if (sortType === SortType.Alphabetical) {
    goods = goods.toSorted((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.Length) {
    goods = goods.toSorted((a, b) => a.length - b.length);
  }

  if (isReversed) {
    goods = goods.toReversed();
  }

  function resetGoods(): void {
    setSortType(SortType.None);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabetical ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.Length ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
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
