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

enum SortField {
  name = 'name',
  length = 'length',
}

interface Filter {
  field: SortField;
  isreverse: boolean;
}

const preparedGoods = (
  goods: string[],
  { field, isreverse }: Filter,
): string[] => {
  const sortedGoods = [...goods];

  if (!field) {
    return isreverse ? sortedGoods.reverse() : sortedGoods;
  }

  sortedGoods.sort((good1, good2) => {
    switch (field) {
      case SortField.name:
        return good1.localeCompare(good2);
      case SortField.length:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  return isreverse ? sortedGoods.reverse() : sortedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField | ''>('');
  const [isReverse, setIsReverse] = useState(false);

  const showGoods = preparedGoods(goodsFromServer, {
    field: sortField,
    isreverse: isReverse,
  });

  const reset = () => {
    setSortField('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          className={cn('button is-info', {
            'is-light': sortField !== SortField.name,
          })}
          onClick={() => setSortField(SortField.name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortField.length,
          })}
          onClick={() => setSortField(SortField.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortField || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {showGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
