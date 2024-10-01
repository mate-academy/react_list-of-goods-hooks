import React, { useState } from 'react';
import cn from 'classnames';
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
  ABC = 'Sort alphabetically',
  LENGTH = 'Sort by length',
  RESET = 'Reset',
}

type DataFromServer = string;

const handleSorting = function (
  data: DataFromServer[],
  sortType: SortType | null,
  isReversed: boolean,
) {
  const sortedData = [...data];

  if (sortType) {
    sortedData.sort((good1, good2) => {
      switch (sortType) {
        case SortType.ABC:
          return good1.localeCompare(good2);
        case SortType.LENGTH:
          return good1.length - good2.length;
        case SortType.RESET:
          return 0;
      }
    });
  }

  if (isReversed) {
    sortedData.reverse();
  }

  return sortedData;
};

export const App: React.FC = () => {
  const [selectedSortType, setSelectedSortType] = useState<SortType | null>(
    null,
  );
  const [isReversed, setReversed] = useState<boolean>(false);

  const visibleData = handleSorting(
    goodsFromServer,
    selectedSortType,
    isReversed,
  );

  function handleReset() {
    setReversed(false);
    setSelectedSortType(null);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', {
            'is-info': selectedSortType === SortType.ABC,
            'is-light': selectedSortType !== SortType.ABC,
          })}
          onClick={() => setSelectedSortType(SortType.ABC)}
        >
          {SortType.ABC}
        </button>

        <button
          type="button"
          className={cn('button', {
            'is-success': selectedSortType === SortType.LENGTH,
            'is-light': selectedSortType !== SortType.LENGTH,
          })}
          onClick={() => setSelectedSortType(SortType.LENGTH)}
        >
          {SortType.LENGTH}
        </button>

        <button
          type="button"
          className={cn('button', {
            'is-warning': isReversed,
            'is-light': !isReversed,
          })}
          onClick={() => setReversed(prevState => !prevState)}
        >
          Reverse
        </button>
        {(selectedSortType || isReversed) && (
          <button
            type="button"
            className={cn('button', {
              'is-danger': selectedSortType === SortType.RESET,
              'is-light': selectedSortType !== SortType.RESET,
            })}
            onClick={handleReset}
          >
            {SortType.RESET}
          </button>
        )}
      </div>

      <ul>
        {visibleData.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
