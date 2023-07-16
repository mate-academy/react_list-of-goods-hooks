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
  SortFieldName = 'name',
  SortFieldLength = 'length',
  SortFieldNone = '',
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
        case SortField.SortFieldName:
          return good1.localeCompare(good2);

        case SortField.SortFieldLength:
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
  const [sortField, setSortField] = useState(SortField.SortFieldNone);
  const [isReversed, setIsReversed] = useState(false);

  const makeSetSortField = (field: SortField) => () => setSortField(field);

  const onReverse = () => setIsReversed(reversed => !reversed);

  const onReset = () => {
    setSortField(SortField.SortFieldNone);
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
            { 'is-light': sortField !== SortField.SortFieldName },
          )}
          onClick={makeSetSortField(SortField.SortFieldName)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortField !== SortField.SortFieldLength },
          )}
          onClick={makeSetSortField(SortField.SortFieldLength)}
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

        {((sortField !== SortField.SortFieldNone || isReversed === true) && (
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
