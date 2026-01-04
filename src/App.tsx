import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import clsx from 'clsx';
import { SortType } from './types/SortTypes';
import { SortOptions } from './types/SortOptions';

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

function sortAlphabetically(good1: string, good2: string): number {
  return good1.localeCompare(good2);
}

function getPreparedGoods(
  goods: string[],
  { sortField, sortOrder }: SortOptions,
): string[] {
  const preparedGoods: string[] = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ALPHABETICAL:
          return sortAlphabetically(good1, good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (sortOrder) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.DEFAULT);
  const [sortOrder, setSortOrder] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    sortOrder,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={clsx('button is-primary', {
            'is-light': sortField !== SortType.ALPHABETICAL,
          })}
          onClick={() => setSortField(SortType.ALPHABETICAL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={clsx('button is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={clsx('button is-warning', { 'is-light': !sortOrder })}
          onClick={() => setSortOrder(!sortOrder)}
        >
          Reverse
        </button>
        {(sortField || sortOrder) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.DEFAULT);
              setSortOrder(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
