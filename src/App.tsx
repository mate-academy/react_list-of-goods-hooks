import 'bulma/css/bulma.css';
import './App.scss';

import React, { useState } from 'react';

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

export enum SortType {
  Default = '',
  Name = 'name',
  Lenght = 'length',
}

function getPreparedGoods(
  goodsFrom: string[],
  sortField: SortType,
  hasReverse: boolean,
) {
  const goods = [...goodsFrom];

  if (sortField) {
    goods.sort((goodA, goodB) => {
      switch (sortField) {
        case SortType.Name:
          return goodA.localeCompare(goodB);

        case SortType.Lenght:
          return goodA.length - goodB.length;

        default:
          return 0;
      }
    });
  }

  if (hasReverse) {
    goods.reverse();
  }

  return goods;
}

function getResetValue(
  sortField: SortType,
  hasReverse: boolean,
) {
  if (sortField.length > 0 || hasReverse) {
    return true;
  }

  return false;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [hasReverse, setHasReverse] = useState(false);

  const hasReset = getResetValue(sortField, hasReverse);
  const sortListGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    hasReverse,
  );

  const deleteSort = () => {
    setHasReverse(false);
    setSortField(SortType.Default);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortField === SortType.Name
            ? 'button is-info'
            : 'button is-info is-light'}
          onClick={() => setSortField(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortField === SortType.Lenght
            ? 'button is-info'
            : 'button is-info is-light'}
          onClick={() => setSortField(SortType.Lenght)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={hasReverse
            ? 'button is-info'
            : 'button is-info is-light'}
          onClick={() => setHasReverse(!hasReverse)}
        >
          Reverse
        </button>

        {hasReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={deleteSort}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortListGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
