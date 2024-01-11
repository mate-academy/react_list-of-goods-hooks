import { useState } from 'react';
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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

interface FilterParams {
  sortField: string;
  reverse: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, reverse }: FilterParams,
) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods
      .sort((good1, good2) => {
        switch (sortField) {
          case SORT_FIELD_ALPHABET:
            return good1.localeCompare(good2);

          case SORT_FIELD_LENGTH:
            return good1.length - good2.length;

          default:
            return 0;
        }
      });
  }

  if (reverse) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, reverse },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABET },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(prevReverse => !prevReverse)}
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !reverse },
          )}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            onClick={() => {
              setSortField('');
              setReverse(false);
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
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
