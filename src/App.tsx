import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

export enum Goods {
  Dumplings = 'Dumplings',
  Carrot = 'Carrot',
  Eggs = 'Eggs',
  IceCream = 'Ice cream',
  Apple = 'Apple',
  Bread = 'Bread',
  Fish = 'Fish',
  Honey = 'Honey',
  Jam = 'Jam',
  Garlic = 'Garlic',
}

function getPreparedGoods(goods: typeof Goods,
  { sortField, isReversed }: { 
    sortField: string; 
    isReversed: boolean; 
  }) {
  const preparedGoods = Object.values(goods);

  if (sortField) {
    preparedGoods.sort((good1: string, good2: string) => {
      switch (sortField) {
        case 'SORT_BY_ALPHABET':
          return good1.localeCompare(good2);

        case 'SORT_BY_LENGTH':
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
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const toSortGoods = getPreparedGoods(Goods, {
    sortField,
    isReversed,
  });

  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField('SORT_BY_ALPHABET')}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== 'SORT_BY_ALPHABET' })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField('SORT_BY_LENGTH')}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== 'SORT_BY_LENGTH' })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(state => !state)}
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        { isReversed === true || sortField !== ''
          ? (
            <button
              onClick={() => handleReset()}
              type="button"
              className={cn('button is-danger is-light')}
            >
              Reset
            </button>
          )
          : ''
        }
      </div>

      <ul>
        <ul>
        {toSortGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
        </ul>
      </ul>
    </div>
  );
};
