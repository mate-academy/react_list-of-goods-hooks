import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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
  SORT_BY_DEFAULT = '',
  SORT_BY_ALPHABET = 'alphabet',
  SORT_BY_LENGTH = 'length',
}

function getPreparedGoods(
  goods: string[],
  { sortField, reverseField }: { sortField: SortType, reverseField: boolean },
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_BY_ALPHABET:
          return good1.localeCompare(good2);
        case SortType.SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [reverseField, setReverseField] = useState(false);
  const [sortField, setSortField]
    = useState<SortType>(SortType.SORT_BY_DEFAULT);
  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortField, reverseField });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.SORT_BY_ALPHABET)}
          type="button"
          className={cn('button', 'is-info',
            {
              'is-light': sortField !== SortType.SORT_BY_ALPHABET,
            })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.SORT_BY_LENGTH)}
          type="button"
          className={cn('button', 'is-success',
            {
              'is-light': sortField !== SortType.SORT_BY_LENGTH,
            })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseField(!reverseField)}
          type="button"
          className={cn('button', 'is-warning',
            {
              'is-light': !reverseField,
            })}
        >
          Reverse
        </button>

        {(sortField !== SortType.SORT_BY_DEFAULT || reverseField) && (
          <button
            onClick={() => {
              setSortField(SortType.SORT_BY_DEFAULT);
              setReverseField(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
