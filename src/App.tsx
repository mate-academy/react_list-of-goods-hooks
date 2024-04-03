import React, { useState } from 'react';
import { GoodList } from './components/listCompot';
import { Goods, SortStatus } from './components/typeCompot';

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

function getPreperedGoods(
  goods: Goods,
  sortField: SortStatus | '',
  isReverseField: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField !== '') {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortStatus.SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SortStatus.SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [isReverseField, setReverseField] = useState(false);
  const [sortField, setSortField] = useState<SortStatus | ''>('');
  const visibleGoods = getPreperedGoods(
    goodsFromServer,
    sortField,
    isReverseField,
  );

  const handleSortAlphabetically = () => {
    setSortField(SortStatus.SORT_FIELD_ALPHABETICALLY);
  };

  const handleSortByLength = () => {
    setSortField(SortStatus.SORT_FIELD_LENGTH);
  };

  const handleReverse = () => {
    setReverseField(!isReverseField);
  };

  const handleReset = () => {
    setSortField('');
    setReverseField(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSortAlphabetically}
          type="button"
          className={`button is-info
          ${sortField === SortStatus.SORT_FIELD_ALPHABETICALLY ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSortByLength}
          type="button"
          className={`button is-success
          ${sortField === SortStatus.SORT_FIELD_LENGTH ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={`button is-warning
          ${isReverseField ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {sortField || isReverseField ? (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        <GoodList goods={visibleGoods} />
      </ul>
    </div>
  );
};
