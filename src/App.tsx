import React from 'react';
import cn from 'classnames';
import { useState } from 'react';
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
  None = '',
  Alphabet = 'alphabet',
  Length = 'length',
} 

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  isReverse: boolean,
): string[] {
  let prepearedGoods = [...goods];
   if (sortField) {
    prepearedGoods = prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Length:
          return good1.length - good2.length;
        case SortType.Alphabet:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}


export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.None);
  const [statusReverse, setStatusReverse] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    statusReverse,
  );
  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Alphabet)}
          type="button"
          className={cn('button is-info', {
            'is-light': !(sortField === SortType.Alphabet),
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.Length)}
          type="button"
          className={cn('button is-success', {
            'is-light': !(sortField === SortType.Length),
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setStatusReverse(prev => !prev)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !statusReverse,
          })}
        >
          Reverse
        </button>

         {(sortField || statusReverse) && (
          <button
            onClick={() => {
              setSortField(SortType.None);
              setStatusReverse(false);
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
          <li key={good} data-cy="Good">
            {good}
          </li>
        )) }
      </ul>
    </div>
  );
};
