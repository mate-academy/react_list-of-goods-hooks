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
  LENGTH = 'length',
  NAME = 'name',
  EMTY = '',
}

interface FilterParams {
  sortField: SortType;
  isReversed: boolean;
}

function getPreparedGoods(
  goods:string[],
  { sortField, isReversed }: FilterParams,
) {
  const preparedGoods = [...goods];

  if (!sortField && isReversed) {
    return preparedGoods.reverse();
  }

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case (SortType.NAME):
          return isReversed
            ? good2.localeCompare(good1)
            : good1.localeCompare(good2);
        case (SortType.LENGTH):
          if (good2.length !== good1.length) {
            return isReversed
              ? good2.length - good1.length
              : good1.length - good2.length;
          }

          return isReversed
            ? good2.localeCompare(good1)
            : good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.EMTY);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortField, isReversed },
  );
  const reset = () => {
    setSortField(SortType.EMTY);
    setIsReversed(false);
  };

  const setSort = (field: SortType | (
    (prevState: SortType) => SortType)) => () => {
    setSortField(field);
  };

  const onReversed = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.NAME,
          })}
          onClick={setSort(SortType.NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
          onClick={setSort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={onReversed}
        >
          Reverse
        </button>
        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
