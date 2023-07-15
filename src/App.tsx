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

enum SortField {
  sortFieldName = 'name',
  sortFieldLength = 'length',
  sortFieldNone = '',
}

type SortParams = {
  sortField: SortField;
  isReversed: boolean;
};

function sortGoodsByParams(
  goods: string[],
  { sortField, isReversed }: SortParams,
): string[] {
  const orderedField = [...goods];

  if (sortField) {
    orderedField.sort((good1, good2) => {
      switch (sortField) {
        case SortField.sortFieldName:
          return good1.localeCompare(good2);

        case SortField.sortFieldLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    orderedField.reverse();
  }

  return orderedField;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortField.sortFieldNone);
  const [isReversed, setIsReversed] = useState(false);

  const makeSetSortField = (field: SortField) => () => setSortField(field);

  const onReverse = () => setIsReversed(reversed => !reversed);

  const onReset = () => {
    setSortField(SortField.sortFieldNone);
    setIsReversed(false);
  }

  const visibleOrder = sortGoodsByParams(
    goodsFromServer,
    { sortField, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortField !== SortField.sortFieldName },
          )}
          onClick={makeSetSortField(SortField.sortFieldName)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortField !== SortField.sortFieldLength },
          )}
          onClick={makeSetSortField(SortField.sortFieldLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': isReversed === false },
          )}
          onClick={onReverse}
        >
          Reverse
        </button>

        {((sortField !== '' || isReversed === true) && (
          <button
            type="button"
            className={cn('button is-danger is-light')}
            onClick={onReset}
          >
            Reset
          </button>
        ))}
      </div>

      <ul>
        {visibleOrder.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
