import React, { useEffect, useState } from 'react';
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

enum SortType {
  alphabet = 'alphabet',
  length = 'length',
  none = 'none',
}

type SortButton = {
  uniqueClassName: string;
  label: string;
};

function orderedGoods(isReverse: boolean, orderBy: SortType) {
  const comparator = isReverse ? -1 : 1;
  const sortHandlers: Record<SortType, (a: string, b: string) => number> = {
    [SortType.alphabet]: (good1, good2) =>
      good1.localeCompare(good2) * comparator,
    [SortType.length]: (good1, good2) =>
      (good1.length - good2.length) * comparator,
    [SortType.none]: () => comparator,
  };
  const sortFunction = sortHandlers[orderBy];

  return [...goodsFromServer].sort(sortFunction);
}

export const App: React.FC = () => {
  const [isReverse, setIsReverse] = useState<boolean>(false);
  const [orderBy, setOrderBy] = useState<SortType>(SortType.none);
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);

  useEffect(() => {
    setVisibleGoods(orderedGoods(isReverse, orderBy));
  }, [isReverse, orderBy]);

  const handleSort = (sortType: SortType) => {
    setOrderBy(order => (order === sortType ? SortType.none : sortType));
  };

  const handleReset = () => {
    setIsReverse(false);
    setOrderBy(SortType.none);
  };

  const toggleReverse = () => {
    setIsReverse(r => !r);
  };

  const isModified = isReverse || orderBy !== SortType.none;

  const sortButtons: Omit<Record<SortType, SortButton>, SortType.none> = {
    [SortType.alphabet]: {
      label: 'alphabetically',
      uniqueClassName: 'is-info',
    },
    [SortType.length]: {
      label: 'by length',
      uniqueClassName: 'is-success',
    },
  };

  return (
    <div className="section content">
      <div className="buttons">
        {Object.entries(sortButtons).map(
          ([sortType, { label, uniqueClassName }]) => (
            <button
              key={sortType}
              type="button"
              onClick={() => handleSort(sortType as SortType)}
              className={`button ${uniqueClassName} ${orderBy === sortType ? 'active' : 'is-light'}`}
            >
              Sort {label}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={toggleReverse}
          className={`button is-warning ${isReverse ? 'active' : 'is-light'}`}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            onClick={handleReset}
            className={'button is-danger'}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
