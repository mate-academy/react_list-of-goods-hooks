import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';
const SORT_BY_INDEX_DESC = 'reverse default';
const ASC = 'asc';
const DESC = 'desc';

function getSortGoods(
  goods: string[],
  sortField: string,
  sortDirection: string,
) {
  const preparedGoods: string[] = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_ALPHABET:
          return sortDirection === ASC
            ? good1.localeCompare(good2)
            : good2.localeCompare(good1);

        case SORT_BY_LENGTH:
          // eslint-disable-next-line no-nested-ternary
          return sortDirection === ASC
            ? good1.length - good2.length
            : good1.length === good2.length
              ? good2.localeCompare(good1)
              : good2.length - good1.length;

        case SORT_BY_INDEX_DESC:
          return preparedGoods.indexOf(good2) - preparedGoods.indexOf(good1);

        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState(ASC);
  const sortGoods = getSortGoods(goodsFromServer, sortField, sortDirection);
  const sortReverse = () => {
    if (sortField === '') {
      setSortField(SORT_BY_INDEX_DESC);
    }

    if (sortDirection === DESC && sortField === SORT_BY_INDEX_DESC) {
      setSortField('');
    }

    if (sortDirection === DESC) {
      setSortDirection(ASC);
    }

    if (sortDirection === ASC) {
      setSortDirection(DESC);
    }
  };

  const forReset = () => {
    setSortField('');
    setSortDirection(ASC);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SORT_BY_ALPHABET);
          }}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SORT_BY_LENGTH);
          }}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => sortReverse()}
          type="button"
          className={cn('button is-warning', {
            'is-light': sortDirection === ASC,
          })}
        >
          Reverse
        </button>

        {sortField && (
          <button
            onClick={() => {
              forReset();
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {sortGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
