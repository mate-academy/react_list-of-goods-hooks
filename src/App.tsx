import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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

const SortBy = {
  ALPHABET: 'alphabet',
  LENGTH: 'length',
  DEFAULT: '',
} as const;

type SortByValues = (typeof SortBy)[keyof typeof SortBy];

interface Param {
  sortField: SortByValues;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: Param,
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortBy.LENGTH:
          return good1.length - good2.length;
        case SortBy.ALPHABET:
          return good1.localeCompare(good2);
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
  const [sortField, setSortField] = useState<SortByValues>(SortBy.DEFAULT);
  const [isReversed, setReverseField] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  function setToDefault() {
    setSortField('');
    setReverseField(false);
  }

  function reverseClick() {
    setReverseField(prev => !prev);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortBy.ALPHABET,
          })}
          onClick={() => setSortField(SortBy.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortBy.LENGTH,
          })}
          onClick={() => setSortField(SortBy.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={reverseClick}
        >
          Reverse
        </button>

        {(isReversed || sortField !== SortBy.DEFAULT) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setToDefault();
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
