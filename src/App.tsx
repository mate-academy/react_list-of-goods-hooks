import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

type Goods = string[];

enum SortFields {
  Name = 'name',
  Length = 'length',
}

interface FilterParams {
  sortField: string;
  hasReversed: boolean;
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

function getPreparedGoods(
  goods: Goods,
  { sortField, hasReversed }: FilterParams,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortFields.Name:
          return good1.localeCompare(good2);

        case SortFields.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (hasReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [hasReversed, setHasReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, hasReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortFields.Name)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortFields.Name,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortFields.Length)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortFields.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setHasReversed(!hasReversed)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': hasReversed !== true,
          })}
        >
          Reverse
        </button>

        {(hasReversed || sortField) && (
          <button
            type="button"
            onClick={() => {
              setHasReversed(false);
              setSortField('');
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
