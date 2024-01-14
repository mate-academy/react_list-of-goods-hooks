import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';

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
  Alphabet = 'alphabet',
  Length = 'length',
  Default = '',
}

interface SortBy {
  method: SortType,
  isReversedOrder: boolean,
}

const sortByDefault = {
  method: SortType.Default,
  isReversedOrder: false,
};

function getPreparedGoods(
  goods: string[],
  { method, isReversedOrder }: SortBy,
) {
  const preparedGoods = [...goods];

  if (method) {
    switch (method) {
      case (SortType.Alphabet): {
        preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      }

      case (SortType.Length): {
        preparedGoods.sort((good1, good2) => good1.length - good2.length);
        break;
      }

      default:
        break;
    }
  }

  if (isReversedOrder) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

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
            cn(
              'button',
              'is-info',
              {
                'is-light': sortBy.method !== SortType.Alphabet,
              },
            )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortBy({ ...sortBy, method: SortType.Length })}
          type="button"
          className={
            cn(
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
            sortBy.isReversedOrder
              ? { ...sortBy, isReversedOrder: false }
              : { ...sortBy, isReversedOrder: true },
          )}
          type="button"
          className={cn(
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
