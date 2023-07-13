import 'bulma/css/bulma.css';
import './App.scss';

import React, { useState } from 'react';
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
  SORT_DEFAULT = '',
  SORT_AB = 'name',
  SORT_LENGTH = 'length',
}

interface SortParams {
  sortType: SortType;
  reverse: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortType, reverse }: SortParams,
) {
  let preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((firstGood, secondGood) => {
      switch (sortType) {
        case SortType.SORT_AB:
          return firstGood.localeCompare(secondGood);

        case SortType.SORT_LENGTH:
          return firstGood.length - secondGood.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.SORT_DEFAULT);
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, { sortType, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.SORT_AB)}
          type="button"
          className={
            cn('button is-info', { 'is-light': sortType !== SortType.SORT_AB })
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.SORT_LENGTH)}
          type="button"
          className={
            cn('button is-success',
              { 'is-light': sortType !== SortType.SORT_LENGTH })
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => (reverse ? setReverse(false) : setReverse(true))}
          type="button"
          className={cn('button is-warning', { 'is-light': !reverse })}
        >
          Reverse
        </button>

        {(sortType || reverse) && (
          <button
            onClick={() => {
              setReverse(false);
              setSortType(SortType.SORT_DEFAULT);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (<li data-cy="Good" key={good}>{good}</li>))}
      </ul>
    </div>
  );
};
