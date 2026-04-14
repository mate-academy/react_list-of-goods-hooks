import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';

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
  enum SortType {
    Default = 'default',
    Alphabetical = 'alphabetical',
    Length = 'length',
  }

  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = [...goodsFromServer];

  if (sortType === SortType.Alphabetical) {
    visibleGoods.sort((goods1, goods2) => goods1.localeCompare(goods2));
  }

  if (sortType === SortType.Length) {
    visibleGoods.sort((goods1, goods2) => goods1.length - goods2.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortType(SortType.Alphabetical)}
          className={`button is-info ${sortType === SortType.Alphabetical ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortType(SortType.Length)}
          className={`button is-success ${sortType === SortType.Length ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(prev => !prev)}
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortType !== SortType.Default || isReversed) && (
          <button
            type="button"
            onClick={() => {
              setSortType(SortType.Default);
              setIsReversed(false);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
