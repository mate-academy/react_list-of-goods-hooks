import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  SORT_BY_ALPHA = 'alphabetically',
  SORT_BY_LENGTH = 'length',
}

export const goodsFromServer: string[] = [
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

function getPreparedGoods(
  goods: string[],
  sortType: string,
  isReverse: boolean,
) {
  let preparedGoods = [...goods];

  if (sortType) {
    preparedGoods = preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.SORT_BY_ALPHA:
          return good1.localeCompare(good2);

        case SortType.SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState('');
  const [isReversedGoods, setIsReversedGoods] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortType,
    isReversedGoods,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.SORT_BY_ALPHA,
          })}
          onClick={() => setSortType(SortType.SORT_BY_ALPHA)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.SORT_BY_LENGTH,
          })}
          onClick={() => setSortType(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversedGoods,
          })}
          onClick={() => setIsReversedGoods(!isReversedGoods)}
        >
          Reverse
        </button>

        {(sortType || isReversedGoods) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType('');
              setIsReversedGoods(false);
            }}
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
