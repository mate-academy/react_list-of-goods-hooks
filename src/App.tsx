import React, { useState } from 'react';

import 'bulma/css/bulma.css';
import './App.scss';

import { SortField } from './types/sortField';
import { SortType } from './types/sortType';
import { Goods } from './Goods';
import { Good } from './types/Good';

export const goodsFromServer: Good = [
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

const preparedGoods = (sortField: SortField) => {
  const goods = [...goodsFromServer].sort((goods1: string, goods2: string) => {
    switch (sortField) {
      case SortType.alphabet:
        return goods1.localeCompare(goods2);
      case SortType.length:
        return goods1.length - goods2.length;
      default:
        return 0;
    }
  });

  return goods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>('');
  const [reverseToogle, setReverseToogle] = useState<boolean | string>(false);
  let visibleGoods = preparedGoods(sortField);

  if (reverseToogle) {
    visibleGoods = visibleGoods.reverse();
  }

  const reverse = () => {
    setReverseToogle(!reverseToogle);
  };

  const reset = () => {
    setSortField('');
    setReverseToogle('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.alphabet)}
          type="button"
          className={`button is-info ${sortField !== SortType.alphabet && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.length)}
          type="button"
          className={`button is-success ${sortField !== SortType.length && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={`button is-warning ${!reverseToogle && 'is-light'}`}
        >
          Reverse
        </button>

        {sortField !== '' || reverseToogle ? (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <Goods goods={visibleGoods} />
    </div>
  );
};
