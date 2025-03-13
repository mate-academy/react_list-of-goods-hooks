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
  default = 'default',
  alphabetically = 'alphabetically',
  byLength = 'byLength',
}

interface SortOption {
  sortField: SortType;
  isReversed: boolean;
}

type Good = string;

function getPreparedGoods(
  goods: Good[],
  { sortField, isReversed }: SortOption,
): string[] {
  const prepareGoods = [...goods];

  if (sortField) {
    prepareGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.alphabetically:
          return good1.localeCompare(good2);

        case SortType.byLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [sortField, setSortField] = useState<SortType>(SortType.default);

  const handleResetSortFields = () => {
    setSortField(SortType.default);
    setIsReversed(false);
  };

  const goodsToRender = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const needToReset = sortField !== SortType.default || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.alphabetically,
          })}
          onClick={() => {
            setSortField(SortType.alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.byLength,
          })}
          onClick={() => {
            setSortField(SortType.byLength);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {needToReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetSortFields}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goodsToRender.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
