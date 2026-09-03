import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export enum SortType {
  NONE = 'none',
  ALPHABETICALLY = 'alphabetically',
  BY_LENGTH = 'length',
}

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
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = [...goodsFromServer];

  switch (sortType) {
    case SortType.ALPHABETICALLY:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SortType.BY_LENGTH:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  const handleReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === SortType.ALPHABETICALLY ? 'is-active' : 'is-light'
          }`}
          data-cy="SortAlphabetically"
          onClick={() => setSortType(SortType.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === SortType.BY_LENGTH ? 'is-active' : 'is-light'
          }`}
          data-cy="SortByLength"
          onClick={() => setSortType(SortType.BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${
            isReversed ? 'is-active' : 'is-light'
          }`}
          data-cy="Reverse"
          onClick={() => setIsReversed(current => !current)}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            data-cy="Reset"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
