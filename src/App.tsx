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

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  let visibleGoods = [...goodsFromServer];

  switch(sortType) {
    case SortType.Alphabetically:
      visibleGoods = [...visibleGoods].toSorted((a, b) =>
        b.localeCompare(a) && a.localeCompare(b)
      );
      break;
    case SortType.Length:
      visibleGoods = [...visibleGoods].toSorted((a, b) =>
        a.length - b.length || b.length - a.length
      );
      break;
    default:
      break;
  }

  if (isReversed) {
    visibleGoods = [...visibleGoods].reverse();
  }

  /*if (sortType === SortType.Alphabetically) {
    visibleGoods = [...visibleGoods].toSorted((a, b) =>
      b.localeCompare(a) && a.localeCompare(b)
    );
  }

  if (sortType === SortType.Length) {
    visibleGoods = [...visibleGoods].toSorted((a, b) =>
      a.length - b.length || b.length - a.length
    );
  }

  if (isReversed && !sortType) {
    visibleGoods = [...visibleGoods].reverse();
  }*/

  /*const isDefaultOrder = sortType === SortType.Default && !isReversed;*/

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-success ${sortType === SortType.Alphabetically ? '' : 'is-light'}`}
          onClick={() => {
            setSortType(SortType.Alphabetically);
            /*setIsReversed(false);*/
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.Length ? '' : 'is-light'}`}
          onClick={() => {
            setSortType(SortType.Length);
            /*setIsReversed(false);*/
          }}
          >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => {
           setIsReversed(current => !current);
          }}
        >
          Reverse
        </button>
        {(sortType || isReversed) && (
          <button
            type="button"
            className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
            onClick={() => {
              setSortType(SortType.Default);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <li>Test</li>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
