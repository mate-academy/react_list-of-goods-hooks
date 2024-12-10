import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

import { GoodList } from './components/GoodList';

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
  Default = '',
  Length = 'length',
  Alphabetical = 'Alphabetical',
}

interface Good {
  name: string;
  internalId: number;
}

function createInternalArrayOfObjectsWithId(arr: string[]): Good[] {
  return arr.map((item, idx) => ({
    name: item,
    internalId: idx,
  }));
}

const goodsListWithId = createInternalArrayOfObjectsWithId(goodsFromServer);

function getSortedGoods(
  goodList: Good[],
  sortValue: string,
  isReversed: boolean,
): Good[] {
  let sorted = goodList.toSorted((good1, good2) => {
    switch (sortValue) {
      case SortType.Length:
        return good1.name.length - good2.name.length;
      case SortType.Alphabetical:
        return good1.name.localeCompare(good2.name);
      default:
        return 0;
    }
  });

  if (isReversed) {
    sorted = sorted.toReversed();
  }

  return sorted;
}

export const App: React.FC = () => {
  const [sortValue, setSortValue] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const isSortedOrReserved = sortValue || isReversed;

  const handleReset = () => {
    setSortValue(SortType.Default);
    setIsReversed(false);
  };

  const sortedGoods = getSortedGoods(goodsListWithId, sortValue, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortValue !== SortType.Alphabetical,
          })}
          onClick={() => setSortValue(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortValue !== SortType.Length,
          })}
          onClick={() => setSortValue(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prevIsReversed => !prevIsReversed)}
        >
          Reverse
        </button>

        {isSortedOrReserved && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={sortedGoods} />
    </div>
  );
};
