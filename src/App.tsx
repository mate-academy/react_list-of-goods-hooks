import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer: readonly string[] = [
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

// const SORT_FIELD_ALPHABETICALLY = 'alphabetically' as const;
// const SORT_FIELD_LENGTH = 'length' as const;
// const SORT_FIELD_RESET = '' as const;

enum SortFieldType {
  Alphabetically = 'alphabetically',
  Length = 'length',
  Reset = '',
}

// type SortFieldType =
//   | typeof SORT_FIELD_ALPHABETICALLY
//   | typeof SORT_FIELD_LENGTH
//   | typeof SORT_FIELD_RESET;

interface GetPreparedGoodsOptions {
  sortField: SortFieldType;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: readonly string[],
  { sortField, isReversed }: GetPreparedGoodsOptions,
): string[] {
  const preparedGoods: string[] = [...goods];

  if (sortField) {
    preparedGoods.sort((good1: string, good2: string): number => {
      switch (sortField) {
        case SortFieldType.Alphabetically:
          return good1.localeCompare(good2);
        case SortFieldType.Length:
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
  const [sortField, setSortField] = useState<SortFieldType>(
    SortFieldType.Reset,
  );
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods: string[] = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const isResetVisible: boolean = !(
    sortField === SortFieldType.Reset && !isReversed
  );

  const handleReset = () => {
    setSortField(SortFieldType.Reset);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortFieldType.Alphabetically,
          })}
          onClick={() => setSortField(SortFieldType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortFieldType.Length,
          })}
          onClick={() => setSortField(SortFieldType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
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
