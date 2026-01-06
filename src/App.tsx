import React from 'react';
import { useState } from 'react';
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

export enum SORT {
  ALPHABET = 'alp',
  LENGTH = 'len',
  REVERSE = 'rev',
}

export type SortField = (typeof SORT)[keyof typeof SORT];

type FoState = {
  sortField?: typeof SORT.ALPHABET | typeof SORT.LENGTH | '';
  reverseField?: typeof SORT.REVERSE | '';
};
type SortType = typeof SORT.ALPHABET | typeof SORT.LENGTH | '';
type ReverseType = typeof SORT.REVERSE | '';

function getSortedGoods(
  goods: string[],
  { sortField, reverseField }: FoState,
): string[] {
  const preparedGoods: string[] = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT.LENGTH:
          return good1.length - good2.length;
        case SORT.ALPHABET:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (reverseField === SORT.REVERSE) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>('');
  const [reverseField, setReversField] = useState<ReverseType>('');
  const normalGoods: string[] = getSortedGoods(goodsFromServer, {
    sortField,
    reverseField,
  });
  const handleSort = (field: SortType) => setSortField(field);
  const handleReverse = () =>
    setReversField(prev => (prev === SORT.REVERSE ? '' : SORT.REVERSE));
  const handleReset = () => {
    setSortField('');
    setReversField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => handleSort(SORT.ALPHABET)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT.ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => handleSort(SORT.LENGTH)}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={cn('button', 'is-warning', {
            'is-light': reverseField !== SORT.REVERSE,
          })}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
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
        {normalGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
