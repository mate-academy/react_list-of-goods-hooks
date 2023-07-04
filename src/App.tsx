import React, { useState } from 'react';
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
  NAME = 'name',
  LENGTH = 'length',
}

const getPreparedGoods = (
  goodsFrom: string[],
  sortField: SortField | '',
  reverse: boolean,
): string[] => {
  const goods = [...goodsFrom];

  if (sortField) {
    goods.sort((a, b) => {
      switch (sortField) {
        case SortField.NAME:
          return a.localeCompare(b);

        case SortField.LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    goods.reverse();
  }

  return goods;
};

function getReset(sortField: SortField | '', reverse: boolean): boolean {
  return sortField !== '' || reverse;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField | ''>('');
  const [reverse, setReversed] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, reverse);
  const reset = getReset(sortField, reverse);

  const resetSort = () => {
    setReversed(false);
    setSortField('');
  };

  const setSort = (field: SortField) => () => {
    setSortField(field);
  };

  const onReverse = () => {
    setReversed(!reverse);
  };

  return (
    <>
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={
              sortField === SortField.NAME
                ? 'button is-info'
                : 'button is-info is-light'
            }
            onClick={setSort(SortField.NAME)}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={
              sortField === SortField.LENGTH
                ? 'button is-info'
                : 'button is-info is-light'
            }
            onClick={setSort(SortField.LENGTH)}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={reverse ? 'button is-info' : 'button is-info is-light'}
            onClick={onReverse}
          >
            Reverse
          </button>

          {reset && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetSort}
            >
              Reset
            </button>
          )}
        </div>

        <ul>
          {visibleGoods.map(good => (
            <li
              key={good}
              data-cy="Good"
            >
              {good}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
