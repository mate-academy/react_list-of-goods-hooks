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

enum SortType {
  SORT_ALPHABET = 'Sort alphabetically',
  SORT_BY_LENGTH = 'Sort by length',
}

type FilterParameter = {
  sortField?: SortType | '';
  isReversed?: boolean;
};

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: FilterParameter,
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_ALPHABET:
          return good1.localeCompare(good2);
        case SortType.SORT_BY_LENGTH:
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
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [isReversed, setIsReversed] = useState(false);

  const preparedGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const isResetButtonVisible = isReversed || sortField;
  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.SORT_ALPHABET)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.SORT_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.SORT_BY_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed(prev => !prev);
          }}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
