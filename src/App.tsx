import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

enum SortType {
  alpha = 'alpha',
  length = 'length',
  All = 'All',
}

function getPreparedGoods(
  goods: string[],
  sortField: string,
  reversed: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.alpha:
          return good1.localeCompare(good2);
        case SortType.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.All);
  const [reverseOrder, setReverseOrder] = useState(false);
  const visibleGoods: string[] = getPreparedGoods(
    goodsFromServer,
    sortField,
    reverseOrder,
  );

  const handleReverseClick = (): void => {
    setReverseOrder(!reverseOrder);
  };

  const handleResetClick = (): void => {
    setSortField(SortType.All);
    setReverseOrder(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SortType.alpha);
          }}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.alpha,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SortType.length);
          }}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            handleReverseClick();
          }}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverseOrder,
          })}
        >
          Reverse
        </button>
        {(sortField !== SortType.All || reverseOrder) && (
          <button
            onClick={handleResetClick}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        <ul>
          {visibleGoods.map((good, index) => {
            return (
              <li key={index} data-cy="Good">
                {good}
              </li>
            );
          })}
        </ul>
      </ul>
    </div>
  );
};
