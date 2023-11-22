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

enum SortType {
  SORT_FILED_DEFAULT = '',
  SORT_FILED_NAME = 'name',
  SORT_FILED_LENGTH = 'length',
}

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: { sortField: SortType, isReversed: boolean },
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_FILED_NAME:
          return good1.localeCompare(good2);

        case SortType.SORT_FILED_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.SORT_FILED_DEFAULT);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods
    = getPreparedGoods(
      goodsFromServer,
      { sortField, isReversed },
    );

  const reset = () => {
    setIsReversed(false);
    setSortField(SortType.SORT_FILED_DEFAULT);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            {
              'is-light': sortField !== SortType.SORT_FILED_NAME,
            },
          )}
          onClick={() => setSortField(SortType.SORT_FILED_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            {
              'is-light': sortField !== SortType.SORT_FILED_LENGTH,
            },
          )}
          onClick={() => setSortField(SortType.SORT_FILED_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            {
              'is-light': !isReversed,
            },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
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
