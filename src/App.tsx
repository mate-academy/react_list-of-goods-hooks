import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

const goodsFromServer: string[] = [
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

const CONST_SORT_VALUE = 'alph';
const CONST_LENGTH_VALUE = 'length';

interface GoodProps {
  sortField: string;
  reverse: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, reverse }: GoodProps,
): string[] {
  const preparedGoods: string[] = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case CONST_SORT_VALUE:
          return good1.localeCompare(good2);
        case CONST_LENGTH_VALUE:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<string>('');
  const [reverse, setReverse] = useState<boolean>(false);

  const visibleGoods: string[] = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== CONST_SORT_VALUE,
          })}
          onClick={() => setSortField(CONST_SORT_VALUE)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== CONST_LENGTH_VALUE,
          })}
          onClick={() => setSortField(CONST_LENGTH_VALUE)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => {
            setReverse(!reverse);
          }}
        >
          Reverse
        </button>

        {(reverse || sortField) && (
          <button
            onClick={() => {
              setReverse(false);
              setSortField('');
            }}
            className="button is-danger is-light"
            type="button"
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
