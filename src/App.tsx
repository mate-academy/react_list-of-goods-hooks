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
  byAsc,
  byLength,
  byDefault,
}

function getPreparedGoods(
  goods: string[],
  sortBy: SortType,
  isReversed: boolean,
): string[] {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortBy) {
      case SortType.byAsc:
        return good1.localeCompare(good2);
      case SortType.byLength:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.byDefault);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const goods = getPreparedGoods(goodsFromServer, sortType, isReversed);

  const reset = () => () => {
    setSortType(SortType.byDefault);
    setIsReversed(false);
  };

  const currentSortType = (query: SortType) => () => {
    if (query === sortType) {
      return;
    }

    setSortType(query);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={currentSortType(SortType.byAsc)}
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.byAsc },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.byLength },
          )}
          onClick={currentSortType(SortType.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({
            'is-light': !isReversed,
          })}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {
          (sortType !== SortType.byDefault || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset()}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
