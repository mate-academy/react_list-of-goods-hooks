import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

import { GoodList } from './Components/GoodList/GoodList';
import { goodsFromServer } from './Components/goodListData';

enum SortField {
  Alphabet = 'abc',
  Id = 'id',
  DefaultSort = '',
}

interface FilterSort {
  sortField: SortField;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  {
    sortField,
    isReversed,
  }: FilterSort,
) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods = preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.Alphabet:

          return good1.localeCompare(good2);

        case SortField.Id:

          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return isReversed ? preparedGoods.reverse() : preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortField.DefaultSort);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortField.Alphabet)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortField.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortField.Id)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortField.Id,
            'is-active': sortField === SortField.Id,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
            'is-active': isReversed,
          })}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            onClick={() => {
              setSortField(SortField.DefaultSort);
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
