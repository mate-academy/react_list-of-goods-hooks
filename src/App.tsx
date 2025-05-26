import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

enum SortField {
  Alphabet = 'alphabet',
  Length = 'length',
  Empty = '',
}

interface SortedBy {
  sortField: SortField;
  isReversed: boolean;
}

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

function getPreperedGoods(
  goods: string[],
  { sortField, isReversed }: SortedBy,
) {
  const preperedGoods = [...goods];

  switch (sortField) {
    case SortField.Alphabet:
      preperedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SortField.Length:
      preperedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortField.Empty);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreperedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });
  const isSorted = !!sortField || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortField.Alphabet,
          })}
          onClick={() => setSortField(SortField.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortField.Length,
          })}
          onClick={() => setSortField(SortField.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortField.Empty);
              setIsReversed(false);
            }}
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
