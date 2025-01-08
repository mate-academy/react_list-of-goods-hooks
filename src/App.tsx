import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import React from 'react';

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

const SORT_BY_NAME = {
  abc: 'abc',
  length: 'length',
};

interface SortOptions {
  sortField: string;
  reverse: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, reverse }: SortOptions,
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      if (sortField === SORT_BY_NAME.abc) {
        return good1.localeCompare(good2);
      }

      if (sortField === SORT_BY_NAME.length) {
        return good1.length - good2.length;
      }

      return 0;
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortName, setSortName] = useState<string>('');
  const [reverse, setReverse] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField: sortName,
    reverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortName !== SORT_BY_NAME.abc,
          })}
          onClick={() => setSortName(SORT_BY_NAME.abc)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortName !== SORT_BY_NAME.length,
          })}
          onClick={() => setSortName(SORT_BY_NAME.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !reverse })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortName || reverse) && (
          <button
            type="button"
            className="button is-danger is-ligh"
            onClick={() => {
              setSortName('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
