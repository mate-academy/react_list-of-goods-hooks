import React from 'react';
import { useState } from 'react';
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
  SORT_ALPHABEICALLY = 'Sort alphabetically',
  SORT_BY_LENGTH = 'Sort by length',
  UNSOTED = '',
}
interface FilterParams {
  sortField: SortType;
  isReversed: boolean;
}

function getPrepareGoods(
  goods: string[],
  { sortField, isReversed }: FilterParams,
): string[] {
  const prepareGoods = [...goods];

  if (sortField) {
    prepareGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_ALPHABEICALLY:
          return good1.localeCompare(good2);
        case SortType.SORT_BY_LENGTH:
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
  const [sortField, setSortField] = useState<SortType>(SortType.UNSOTED);
  const [isReversed, setIsReversed] = useState(false);

  const prepareGoods = getPrepareGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const resetGood = () => {
    setSortField(SortType.UNSOTED);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.SORT_ALPHABEICALLY)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.SORT_ALPHABEICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.SORT_BY_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>
        {(sortField || isReversed) && (
          <button
            onClick={resetGood}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {prepareGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
