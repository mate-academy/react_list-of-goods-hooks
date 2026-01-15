import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';

type Goods = string[];

type SortField = '' | typeof SORT_BY_ALPHABET | typeof SORT_BY_LENGTH;

interface SortParams {
  sortField: string;
  isReversed: boolean;

}

export const goodsFromServer: Goods = [
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

const SORT_BY_LENGTH = 'length';
const SORT_BY_ALPHABET = 'alphabet';

function getPreparedGoods(
  goods: Goods,
  { sortField, isReversed}: SortParams,
) {

  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
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
  const [sortField, setSortField] = useState<SortField>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const isResetVisible = sortField !== '' || isReversed;

  return (
    <div className="section content">
    <div className="buttons">
      <button
        type="button"
        onClick={() => setSortField(SORT_BY_ALPHABET)}
        className={cn('button is-info', {
          'is-light': sortField !== SORT_BY_ALPHABET,
        })}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        onClick={() => setSortField(SORT_BY_LENGTH)}
        className={cn('button is-success', {
          'is-light': sortField !== SORT_BY_LENGTH,
        })}
      >
        Sort by length
      </button>

      <button
        type="button"
        onClick={() => setIsReversed(prev => !prev)}
        className={cn('button is-warning', { 'is-light': !isReversed })}
      >
        Reverse
      </button>

      {isResetVisible && (
        <button
          type="button"
          onClick={() => {
            setSortField('');
            setIsReversed(false);
          }}
          className="button is-danger is-light"
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
