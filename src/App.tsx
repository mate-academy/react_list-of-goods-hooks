import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

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
  SORT_BY_ASCI = 'sortByAsci',
  SORT_BY_LENGTH = 'sortByLength'
}

type Sort = {
  sortField: SortType | '';
  isReversed: boolean;
}

function getSortGoods(goods: string[], { sortField, isReversed }: Sort) {
  const sortGoods = [...goods];

  if (sortField) {
    sortGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_BY_ASCI:
          return good1.localeCompare(good2);

        case SortType.SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    sortGoods.reverse();
  }

  return sortGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<Sort['sortField']>('');
  const [isReversed, setIsReversed] = useState<Sort['isReversed']>(false);
  const visibleGood = getSortGoods(goodsFromServer, { sortField, isReversed });

  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.SORT_BY_ASCI,
          })}
          onClick={() => setSortField(SortType.SORT_BY_ASCI)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed !== true,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(sortField !== '' || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      {visibleGood.map(good => (
        <li data-cy="Good" key={good}>
          {good}
        </li>
      ))}
    </div>
  );
};
