import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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

interface SortState {
  sortBy: SortType;
  isReversed: boolean;
}

enum SortType {
  None = '',
  Name = 'name',
  Length = 'length',
}

const getPreparedGoods = (
  goods: string[],
  { sortBy, isReversed }: SortState,
) => {
  let preparedGoods = [...goods];

  if (sortBy !== SortType.None) {
    preparedGoods = preparedGoods.sort((goodA, goodB) => {
      switch (sortBy) {
        case SortType.Name:
          return goodA.localeCompare(goodB);
        case SortType.Length:
          return goodA.length - goodB.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const handleResetFilters = () => {
    setSortBy(SortType.None);
    setIsReversed(false);
  };

  const preparedGoods = getPreparedGoods(goodsFromServer, {
    sortBy,
    isReversed,
  });

  const isModified = sortBy !== SortType.None || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortBy !== SortType.Name,
          })}
          onClick={() => setSortBy(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortBy !== SortType.Length,
          })}
          onClick={() => setSortBy(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetFilters}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
