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
  Alphabetically = 'alphabetically',
  ByLength = 'length',
  Reverse = 'reverse',
}

interface SortField {
  field: SortType | '';
  order: SortType | '';
}

function getPreparedGoods(goods: string[], sortField: SortField): string[] {
  const preparedGoods = [...goods];

  if (sortField.field) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField.field) {
        case SortType.Alphabetically:
          return good1.localeCompare(good2);
        case SortType.ByLength:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (sortField.order === SortType.Reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

const initialGoods: SortField = { field: '', order: '' };

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>(initialGoods);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField);
  const isShowReset = sortField.field || sortField.order;

  const handleReverse = () => {
    if (sortField.order) {
      setSortField({ ...sortField, order: '' });
    } else {
      setSortField({ ...sortField, order: SortType.Reverse });
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField.field !== SortType.Alphabetically,
          })}
          onClick={() => {
            setSortField({ ...sortField, field: SortType.Alphabetically });
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField.field !== SortType.ByLength,
          })}
          onClick={() => {
            setSortField({ ...sortField, field: SortType.ByLength });
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': sortField.order !== SortType.Reverse,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>
        {isShowReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortField(initialGoods)}
          >
            Reset
          </button>
        )}
      </div>
      {visibleGoods.map(good => (
        <li
          data-cy="Good"
          key={good}
        >
          {good}
        </li>
      ))}
    </div>
  );
};
