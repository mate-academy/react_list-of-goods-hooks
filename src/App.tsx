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
  NONE = '',
  ABC = 'abc',
  LENGTH = 'length',
}

type SortField = SortType;
type DirectionOrder = 'asc' | 'desc';

interface SortOptions {
  sortField: SortType;
  directionOrder: DirectionOrder;
}

function getPreparedGoods(
  goodFromServer: string[],
  { sortField, directionOrder }: SortOptions,
): string[] {
  const preparedGoods = [...goodFromServer];

  if (sortField !== SortType.NONE) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ABC:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (directionOrder === 'desc') {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>(SortType.NONE);
  const [directionOrder, setDirectionOrder] = useState<DirectionOrder>('asc');

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    directionOrder,
  });

  const reverseOrder = () => {
    setDirectionOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleReverseOrder = () => {
    setSortField(SortType.NONE);
    setDirectionOrder('asc');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.ABC)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.ABC,
          })}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setSortField(SortType.LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>
        <button
          onClick={reverseOrder}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': directionOrder === 'asc',
          })}
        >
          Reverse
        </button>
        {sortField || directionOrder !== 'asc' ? (
          <button
            onClick={handleReverseOrder}
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
          >
            Reset
          </button>
        ) : null}
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
