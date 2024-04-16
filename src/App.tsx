import 'bulma/css/bulma.css';
import './App.scss';
import React from 'react';
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
  None = 'none',
  SortByName = 'name',
  SortByLength = 'length',
}

function getSortedGoods(
  goods: string[],
  sortField: string,
  isReversed: boolean,
) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SortByLength:
          return good1.length - good2.length;
        case SortType.SortByName:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getSortedGoods(goodsFromServer, sortField, isReversed);

  const resetStates = () => {
    setSortField(SortType.None);
    setIsReversed(false);
  };

  const reverseState = () => {
    setIsReversed(!isReversed);
  };

  const handleSort = (sortType: SortType) => () => setSortField(sortType);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSort(SortType.SortByName)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.SortByName,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSort(SortType.SortByLength)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.SortByLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={reverseState}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortField !== SortType.None || isReversed) && (
          <button
            onClick={resetStates}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
