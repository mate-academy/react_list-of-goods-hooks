import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

enum SORTFIELD {
  alphabet = 'alphabet',
  length = 'length',
}

type Params = {
  sortField: string;
  isReverse: boolean;
};

function getPreparedGoods(
  goods: string[],
  { sortField, isReverse }: Params,
): string[] {
  let preparedGoods = [...goods];

  if (sortField === SORTFIELD.alphabet) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortField === SORTFIELD.length) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORTFIELD.alphabet,
          })}
          onClick={() => {
            setSortField(SORTFIELD.alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORTFIELD.length,
          })}
          onClick={() => {
            setSortField(SORTFIELD.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setReverse(a => !a)}
        >
          Reverse
        </button>

        {(isReverse || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReverse(false);
              setSortField('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(g => {
          return (
            <li key={g} data-cy="Good">
              {g}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
