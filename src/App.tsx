import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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

interface SortOptions {
  sortField: 'alphabetically' | 'length' | null;
  isReverse: boolean;
}

function getPreparedList(
  goods: string[],
  { sortField, isReverse }: SortOptions,
): string[] {
  const list = [...goods];

  if (sortField) {
    list.sort((good1, good2) => {
      switch (sortField) {
        case 'alphabetically':
          return good1.localeCompare(good2);
        case 'length':
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    return list.reverse();
  }

  return list;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortOptions['sortField']>(null);
  const [isReverse, setReverse] = useState(false);

  const visibleGoods = getPreparedList(goodsFromServer, {
    sortField,
    isReverse,
  });

  function reset(): void {
    setSortField(null);
    setReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== 'alphabetically',
          })}
          onClick={() => setSortField('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== 'length',
          })}
          onClick={() => setSortField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setReverse(!isReverse)}
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
