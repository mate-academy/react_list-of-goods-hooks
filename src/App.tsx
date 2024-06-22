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
  Alphabetical = 'alphabetical',
  Length = 'length',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = [...goodsFromServer];

  if (sortType === SortType.Alphabetical) {
    visibleGoods.sort();
  } else if (sortType === SortType.Length) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  const reversedGoods = () => {
    setIsReversed(!isReversed);
  };

  const resetState = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.Alphabetical && 'is-light'}`}
          onClick={() => setSortType(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortType.Length && 'is-light'}`}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
          onClick={reversedGoods}
        >
          Reverse
        </button>

        {(sortType !== SortType.None || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetState}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good, index) => {
          const uniqueKey = `${index}`;

          return (
            <li key={uniqueKey} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
