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
];

const SORT_BY_ALPHABET = 'alphabetically';
const SORT_BY_LENGTH = 'length';

interface FilterParams<T> {
  goods: string;
  sortField: keyof T;
  reversed: boolean;
}

function getPreparedGoods<T>(
  goods: T[],
  { sortField, reversed }: FilterParams<T>,
) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      const value1 = good1[sortField] as keyof T;
      const value2 = good2[sortField] as keyof T;

      if (typeof value1 === 'number' && typeof value2 === 'number') {
        return value1 - value2;
      }

      if (typeof value1 === 'string' && typeof value2 === 'string') {
        return value1.localeCompare(value2);
      }

      return 0;
    });
  }

  if (reversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reversed,
  });
  const isChanged = !visibleGoods.every(
    (good, i) => good === goodsFromServer[i],
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_BY_ALPHABET,
          })}
          onClick={() => setSortField(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className={cn('button is-danger', {
              'is-light': !isChanged,
            })}
            onClick={() => {
              setSortField('');
              setReversed(false);
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
