import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/GoodsList';
import classNames from 'classnames';
import { SortOptions } from './types/SortType';

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
export enum SortType {
  SORT_FIELD_ALPHA = 'alphabetical',
  SORT_FIELD_LENGTH = 'length',
}

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: SortOptions,
) {
  const preparedGoods = [...goods];

  if (sortField === SortType.SORT_FIELD_ALPHA) {
    preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
  } else if (sortField === SortType.SORT_FIELD_LENGTH) {
    preparedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const toggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const resetFilters = () => {
    setSortField('');
    setIsReversed(false);
  };

  const isFilterApplied = sortField || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.SORT_FIELD_ALPHA,
          })}
          onClick={() => {
            setSortField(SortType.SORT_FIELD_ALPHA);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.SORT_FIELD_LENGTH,
          })}
          onClick={() => {
            setSortField(SortType.SORT_FIELD_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {isFilterApplied && (
          <button
            type="button"
            className={classNames('button', {
              'is-danger': isFilterApplied,
              'is-light': isFilterApplied,
            })}
            onClick={resetFilters}
          >
            Reset
          </button>
        )}
      </div>
      <GoodsList goods={visibleGoods} />
    </div>
  );
};
