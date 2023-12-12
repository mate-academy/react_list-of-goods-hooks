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
  ABC = 'ABC',
  Length = 'length',
  Default = '',
}

const changeGoodsOrder = (
  goods: typeof goodsFromServer,
  sortBy: string,
  isReversed: boolean,
) => {
  const goodsCopy = [...goods];

  if (sortBy) {
    switch (sortBy) {
      case SortType.ABC:
        goodsCopy.sort((goodA, goodB) => goodA.localeCompare(goodB));

        break;

      case SortType.Length:
        goodsCopy.sort((goodA, goodB) => goodA.length - goodB.length);

        break;

      default:
        break;
    }
  }

  if (isReversed) {
    goodsCopy.reverse();
  }

  return goodsCopy;
};

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);
  const goods = changeGoodsOrder(goodsFromServer, sortBy, isReversed);

  const handleResetOnClick = () => {
    setIsReversed(false);
    setSortBy(SortType.Default);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            {
              'is-light': sortBy !== SortType.ABC,
            })}
          onClick={() => setSortBy(SortType.ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            {
              'is-light': sortBy !== SortType.Length,
            })}
          onClick={() => setSortBy(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            {
              'is-light': !isReversed,
            })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetOnClick}
          >
            Reset
          </button>
        )}
      </div>

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
    </div>
  );
};
