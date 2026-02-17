import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

enum SortType {
  SORT_ALPHABETICAL = 'alphabetical',
  SORT_BY_LENGTH = 'length',
  DEFAULT = '',
}

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

function sortGoods(goods: string[], sortField: SortType, isReversed: boolean) {
  const sortedGoods = [...goods];

  if (sortField === SortType.SORT_ALPHABETICAL) {
    sortedGoods.sort((goodA, goodB) => goodA.localeCompare(goodB));
  } else if (sortField === SortType.SORT_BY_LENGTH) {
    sortedGoods.sort((goodA, goodB) => goodA.length - goodB.length);
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

function checkInitialOrder(goods: string[], originalGoods: string[]) {
  return goods.every((good, index) => good === originalGoods[index]);
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = sortGoods(goodsFromServer, sortField, isReversed);
  const showResetButton = !checkInitialOrder(visibleGoods, goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            setSortField(SortType.SORT_ALPHABETICAL);
          }}
          className={cn('button is-info', {
            'is-light': sortField !== SortType.SORT_ALPHABETICAL,
            'is-active': sortField === SortType.SORT_ALPHABETICAL,
          })}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          onClick={() => {
            setSortField(SortType.SORT_BY_LENGTH);
          }}
          className={cn('button is-success', {
            'is-light': sortField !== SortType.SORT_BY_LENGTH,
            'is-active': sortField === SortType.SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>
        <button
          type="button"
          onClick={() => {
            setIsReversed(prev => !prev);
          }}
          className={cn('button is-warning', {
            'is-light': !isReversed,
            'is-active': isReversed,
          })}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            onClick={() => {
              setSortField(SortType.DEFAULT);
              setIsReversed(false);
            }}
            className="button is-danger is-light"
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
