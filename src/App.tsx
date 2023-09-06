import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';

import './App.scss';
import { Good } from './types/Good';
import { GoodsList } from './components/GoodsList/GoodsList';

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
  Alphabetically = 'alphabetically',
  ByLength = 'by length',
  NoSorting = '',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
): Good[] {
  const preparedGoods = goods.map((good, index) => ({
    name: good,
    id: index + 1,
  }));

  if (sortField === SortType.Alphabetically
    || sortField === SortType.ByLength
  ) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabetically:
          return good1.name.localeCompare(good2.name);

        case SortType.ByLength:
          return good1.name.length - good2.name.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.NoSorting);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, sortField, isReversed,
  );
  const reset = () => {
    setSortField(SortType.NoSorting);
    setIsReversed(false);
  };

  const isSorted = (sortField || isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => (setSortField(SortType.Alphabetically))}
          className={
            cn(
              'button',
              'is-info',
              { 'is-light': sortField !== SortType.Alphabetically },
            )
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => (setSortField(SortType.ByLength))}
          className={
            cn(
              'button',
              'is-success',
              { 'is-light': sortField !== SortType.ByLength },
            )
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(prevValue => !prevValue)}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
