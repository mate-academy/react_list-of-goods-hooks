import React, { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { FilterParams, SortType } from './types';

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

const sortByDefault: FilterParams = {
  method: SortType.Default,
  isReversedOrder: false,
};

const getPreparedGoods = (
  list: string[],
  { method, isReversedOrder }: FilterParams,
) => {
  const preparedGoods = [...list];

  if (method) {
    preparedGoods.sort((good1, good2) => {
      switch (method) {
        case (SortType.Alphabet):
          return good1.localeCompare(good2);

        case (SortType.Length):
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversedOrder) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(sortByDefault);
  const goods = getPreparedGoods(goodsFromServer, sortBy);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortBy({ ...sortBy, method: SortType.Alphabet })}
          type="button"
          className={
            classNames(
              'button',
              'is-info',
              {
                'is-light': sortBy.method !== SortType.Alphabet,
              },
            )
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortBy({ ...sortBy, method: SortType.Length })}
          type="button"
          className={
            classNames(
              'button',
              'is-success',
              {
                'is-light': sortBy.method !== SortType.Length,
              },
            )
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => setSortBy(
            { ...sortBy, isReversedOrder: !sortBy.isReversedOrder },
          )}
          type="button"
          className={classNames(
            'button',
            'is-warning',
            {
              'is-light': !sortBy.isReversedOrder,
            },
          )}
        >
          Reverse
        </button>

        {(sortBy.method || sortBy.isReversedOrder) && (
          <button
            onClick={() => setSortBy({
              method: SortType.Default,
              isReversedOrder: false,
            })}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
