import React from 'react';
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

enum SortType {
  SORT_FIELD_ALPHABET = 'alphabet',
  SORT_FIELD_LENGHT = 'length',
  SORT_FIELD_REVERSE = 'reverse',
  NOT_ACTIVE_CLASS = 'is-light',
}

interface SortParams {
  sortField: string;
  reversSort: string;
}

function getPreperetGoods(
  goods: string[],
  { sortField, reversSort }: SortParams,
) {
  const preperetGoods = [...goods];

  if (sortField) {
    preperetGoods.sort((goods1, goods2) => {
      switch (sortField) {
        case SortType.SORT_FIELD_ALPHABET:
          return goods1.localeCompare(goods2);
        case SortType.SORT_FIELD_LENGHT:
          return goods1.length - goods2.length;
        default:
          return 0;
      }
    });
  }

  if (reversSort) {
    preperetGoods.reverse();
  }

  return preperetGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [reversSort, setReversSort] = useState('');
  const visibleGoods = getPreperetGoods(goodsFromServer, {
    sortField,
    reversSort,
  });

  const reset = () => {
    setSortField('');
    setReversSort('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            sortField !== SortType.SORT_FIELD_ALPHABET &&
              SortType.NOT_ACTIVE_CLASS,
          )}
          onClick={() => setSortField(SortType.SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            sortField !== SortType.SORT_FIELD_LENGHT &&
              SortType.NOT_ACTIVE_CLASS,
          )}
          onClick={() => setSortField(SortType.SORT_FIELD_LENGHT)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            !reversSort && SortType.NOT_ACTIVE_CLASS,
          )}
          onClick={() =>
            reversSort === ''
              ? setReversSort(SortType.SORT_FIELD_REVERSE)
              : setReversSort('')
          }
        >
          Reverse
        </button>

        {(sortField || reversSort) && (
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
        {visibleGoods.map(goods => (
          <li data-cy="Good" key={goods}>
            {goods}
          </li>
        ))}
      </ul>
    </div>
  );
};
