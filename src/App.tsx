import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

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

enum SortBy {
  default,
  length,
  asc,
}

function getPrepareGoods(
  goods: string[],
  sortField: SortBy,
  reverseField: boolean,
): string[] {
  const prepareGoods = [...goods];

  if (!sortField && reverseField) {
    prepareGoods.reverse();
  } else if (sortField) {
    prepareGoods.sort((a, b) => {
      if (!reverseField) {
        switch (sortField) {
          case SortBy.asc:
            return a.localeCompare(b);
          case SortBy.length:
            return a.length - b.length;
          default:
            return 0;
        }
      } else {
        switch (sortField) {
          case SortBy.asc:
            return b.localeCompare(a);
          case SortBy.length:
            return b.length - a.length;
          default:
            return 0;
        }
      }
    });
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortBy>(
    SortBy.default,
  );
  const [reverseField, setReverseField] = useState<boolean>(false);

  const visibleGoods = getPrepareGoods(
    goodsFromServer,
    sortField,
    reverseField,
  );

  function reverseWithConditions() {
    const reverseValue = !reverseField;

    setReverseField(reverseValue);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SortBy.asc },
          )}
          onClick={() => setSortField(SortBy.asc)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SortBy.length },
          )}
          onClick={() => setSortField(SortBy.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': reverseField },
          )}
          onClick={() => reverseWithConditions()}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortBy.default);
              setReverseField(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={`#id-${good}`}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
