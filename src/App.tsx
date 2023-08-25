import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  SortDefault = '',
  SortAlphabet = 'abc',
  SortLength = 'length',
}

interface FilterParam {
  sortFilter: SortType;
  isReverseFilter: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortFilter, isReverseFilter } : FilterParam,
) {
  const prepareGoods = [...goods];

  if (sortFilter) {
    prepareGoods.sort((good1, good2) => {
      switch (sortFilter) {
        case (SortType.SortAlphabet):
          return good1.localeCompare(good2);

        case (SortType.SortLength):
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverseFilter) {
    prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [sortFilter, setSortFilter] = useState(SortType.SortDefault);
  const [isReverseFilter, setIsReverseFilter] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortFilter, isReverseFilter },
  );

  const resetFilter = () => {
    setSortFilter(SortType.SortDefault);
    setIsReverseFilter(false);
  };

  const handleSort = (sortField: SortType) => setSortFilter(sortField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortFilter !== SortType.SortAlphabet,
          })}
          onClick={() => handleSort(SortType.SortAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortFilter !== SortType.SortLength,
          })}
          onClick={() => handleSort(SortType.SortLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverseFilter,
          })}
          onClick={() => setIsReverseFilter(!isReverseFilter)}
        >
          Reverse
        </button>

        {(sortFilter || isReverseFilter) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetFilter}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        { visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
