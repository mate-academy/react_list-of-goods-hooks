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
  Default = 'default',
  Name = 'name',
  Length = 'length',
}

type PreapreOptions = {
  sortField: SortType;
  isReversed: boolean;
};

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: PreapreOptions,
): string[] {
  const preparedGoods = [...goods];

  if (sortField === SortType.Name) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortField === SortType.Length) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed === true) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SortType.Name ? 'is-light' : ''}`}
          onClick={() => setSortField(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SortType.Length ? 'is-light' : ''}`}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {sortField !== SortType.Default || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.Default);
              setIsReversed(false);
            }}
          >
            {' '}
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
