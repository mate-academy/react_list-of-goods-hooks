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
  ALPHABETICALLY = 'alphabetically',
  LENGTH = 'length',
  NONE = '',
}

function sortArr(sortField: SortType, array: string[]): string[] {
  const arr = [...array];

  if (sortField === SortType.ALPHABETICALLY) {
    return arr.sort();
  }

  if (sortField === SortType.LENGTH) {
    return arr.sort((elem1, elem2) => elem1.length - elem2.length);
  }

  if (sortField === SortType.NONE) {
    return arr;
  }

  return arr;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  let visibleGoods = sortArr(sortField, goodsFromServer);

  if (isReversed) {
    visibleGoods = visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? SortType.NONE : 'is-light'}`}
          onClick={() =>
            isReversed === false ? setIsReversed(currentValue => !currentValue) : setIsReversed(currentValue => !currentValue)
          }
        >
          Reverse
        </button>
        {sortField !== SortType.NONE || isReversed === true ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.NONE);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map(good => {
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
