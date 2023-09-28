import React, { useState } from 'react';
import classnames from 'classnames';
import 'bulma/css/bulma.css';

import { Goods } from './types/Goods';
import { SortType } from './types/SortType';
import './App.scss';
import { GoodList } from './components/GoodsList/GoodsList';

export const goodsFromServer: Goods = [
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

interface SortParams<T> {
  sortReverse: boolean;
  sortField: keyof T | '';
}

function getPreparedGoods<T>(
  goods: T[],
  { sortReverse, sortField }: SortParams<T>,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((element1, element2) => {
      const value1 = element1[sortField];
      const value2 = element2[sortField];

      if (typeof value1 === 'number' && typeof value2 === 'number') {
        return value1 - value2;
      }

      if (typeof value1 === 'string' && typeof value2 === 'string') {
        return value1.localeCompare(value2);
      }

      return 0;
    });
  }

  if (sortReverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<keyof SortType | ''>('');
  const [sortReverse, setSortReverse] = useState(false);
  const visibleGoods
  = getPreparedGoods(goodsFromServer, { sortReverse, sortField });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classnames(
            'button is-info',
            { 'is-light': sortField !== SortType.Name as keyof SortType },
          )}
          onClick={() => setSortField(SortType.Name as keyof SortType)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classnames(
            'button is-success',
            { 'is-light': sortField !== SortType.Length },
          )}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classnames(
            'button is-warning',
            { 'is-light': !sortReverse },
          )}
          onClick={() => setSortReverse(!sortReverse)}
        >
          Reverse
        </button>

        {(sortField || sortReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setSortReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList visibleGoods={visibleGoods} />
    </div>
  );
};
