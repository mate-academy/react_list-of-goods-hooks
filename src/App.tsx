import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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

interface Params {
  sortField: string;
  reverse: boolean;
}

enum SortType {
  SORT_FIELD_ALPHABET = 'alphabet',
  SORT_FIELD_LENGTH = 'length',
}

function getPreparedGoods(
  goods: string[],
  { sortField, reverse }: Params,
) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SortType.SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse !== false) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortField, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SortType.SORT_FIELD_ALPHABET);
          }}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SortType.SORT_FIELD_ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SortType.SORT_FIELD_LENGTH);
          }}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SortType.SORT_FIELD_LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReverse(!reverse);
          }}
          type="button"
          className={`button is-warning  ${cn({
            'is-light': reverse === false,
          })}`}
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
