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

// const SORT_FIELD = {
//   ALFAB: 'alfab',
//   LENGTH: 'length',
// };

enum SortType {
  ALFAB = 'alfab',
  LENGTH = 'length',
}

type SortOptions = {
  sortField: SortType | null;
  sortReverse: boolean;
};

function getPrepearedGoods(
  goods: string[],
  { sortField, sortReverse }: SortOptions,
): string[] {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ALFAB:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (sortReverse) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setsortField] = useState<SortType | null>(null);
  const [sortReverse, setsortReverse] = useState(false);
  const sortedGoods = getPrepearedGoods(goodsFromServer, {
    sortField,
    sortReverse,
  });

  const resetSort = () => {
    setsortField(null);
    setsortReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setsortField(SortType.ALFAB)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.ALFAB,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setsortField(SortType.LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setsortReverse(!sortReverse)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !sortReverse,
          })}
        >
          Reverse
        </button>

        {(sortField || sortReverse) && (
          <button
            onClick={resetSort}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
