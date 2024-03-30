import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
import React from 'react';

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
  none,
  name,
  length,
}

function prepareGoods(
  goodsList: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const preparedGoods = [...goodsList];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
          switch (sortType) {
        case SortType.name:
          return good1.localeCompare(good2);

        case SortType.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return isReversed ? preparedGoods.reverse() : preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState(SortType.none);
  const [isReversed, setIsReversed] = useState(false);

  const handleResetChange = () => {
    setSortType(SortType.none);
    setIsReversed(false);
  }

  const visibleGoods: string[] = prepareGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.name,
          })}
          onClick={() => setSortType(SortType.name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.length,
          })}
          onClick={() => setSortType(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetChange}
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
