import React, { useState, useMemo } from 'react';
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

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField | ''>('');
  const [isReverse, setIsReverse] = useState<boolean>(false);

  const visibleGoods = useMemo(
    () => getPreparedGoods(goodsFromServer, sortField, isReverse),
    [goodsFromServer, sortField, isReverse],
  );

  const resetSort = () => {
    setIsReverse(false);
    setSortField('');
  };

  const setSort = (field: SortField) => () => {
    setSortField(field);
  };

  const onReverse = () => {
    setIsReverse(true);
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
            className={isReverse ? 'button is-info' : 'button is-info is-light'}
            onClick={onReverse}
          >
            Reverse
          </button>

          {(sortField !== '' || isReverse) && (
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
