import React, { useState } from 'react';
import classnames from 'classnames';
import 'bulma/css/bulma.css';

import { Goods } from './types/Goods';
import { GoodList } from './components/GoodsList/GoodsList';
import { SORT_FIELD } from './constans';
import './App.scss';

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
interface SortParams {
  sortReverse: boolean;
  sortField: string;
}

function getPreparedGoods(
  goods: string[],
  { sortReverse, sortField }: SortParams,
) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods = preparedGoods.sort((element1, element2) => {
      switch (sortField) {
        case SORT_FIELD.LENGTH:
          return element1.length - element2.length;
        case SORT_FIELD.NAME:
          return element1.localeCompare(element2);
        default:
          return 0;
      }
    });
  }

  if (sortReverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<string>('');
  const [isReverse, setIsReverse] = useState<boolean>(false);
  const visibleGoods
  = getPreparedGoods(goodsFromServer, { sortReverse: isReverse, sortField });

  const reset = (): void => {
    setSortField('');
    setIsReverse(false);
  };

  const handleReverseClick = () => {
    setIsReverse(prev => !prev);
  };

  const handleSortByLengthClick = () => {
    setSortField(SORT_FIELD.LENGTH);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classnames(
            'button is-info',
            { 'is-light': sortField !== SORT_FIELD.NAME },
          )}
          onClick={() => setSortField(SORT_FIELD.NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classnames(
            'button is-success',
            { 'is-light': sortField !== SORT_FIELD.LENGTH },
          )}
          onClick={handleSortByLengthClick}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classnames(
            'button is-warning',
            { 'is-light': !isReverse },
          )}
          onClick={handleReverseClick}
        >
          Reverse
        </button>

        {(sortField || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList visibleGoods={visibleGoods} />
    </div>
  );
};
