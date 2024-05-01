import React, { useState } from 'react';
import cn from 'classnames';

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

enum SortFields {
  'default',
  'alphabetically',
  'lengthy',
  'reverse',
}

function getPreparedGoods(
  goods: string[],
  fieldsToSort: SortFields[],
): string[] {
  const preparedGoods = [...goods];

  if (fieldsToSort.includes(SortFields.alphabetically)) {
    preparedGoods.sort((good1, good2) => {
      return good1.localeCompare(good2);
    });
  }

  if (fieldsToSort.includes(SortFields.lengthy)) {
    preparedGoods.sort((good1, good2) => {
      return good1.length - good2.length;
    });
  }

  if (fieldsToSort.includes(SortFields.reverse)) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<number[]>([]);
  const visibleGoods: string[] = getPreparedGoods(goodsFromServer, sortField);

  function updateSortField(field: number) {
    if (field === SortFields.reverse) {
      setSortField(
        sortField.includes(field)
          ? [...sortField].filter(currentField => currentField !== field)
          : [...sortField, field],
      );
    } else {
      setSortField(
        /* eslint-disable @typescript-eslint/indent */
        field === SortFields.lengthy
          ? [...sortField, field].filter(
              currentField => currentField !== SortFields.alphabetically,
            )
          : [...sortField, field].filter(
              currentField => currentField !== SortFields.lengthy,
            ),
      );
    }
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !sortField.includes(SortFields.alphabetically),
          })}
          onClick={() => updateSortField(SortFields.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': !sortField.includes(SortFields.lengthy),
          })}
          onClick={() => updateSortField(SortFields.lengthy)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !sortField.includes(SortFields.reverse),
          })}
          onClick={() => updateSortField(SortFields.reverse)}
        >
          Reverse
        </button>

        {sortField.length > 0 && (
          <>
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => setSortField([])}
            >
              Reset
            </button>
          </>
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
