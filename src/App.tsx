import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

import { SortBy } from './types/SortBy';
import { Goods } from './types/Goods';

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

function sortGoods(goods: Goods, sortBy: SortBy) {
  const goodsToSort = [...goods];

  switch (sortBy) {
    case SortBy.ALPHABET:
      return goodsToSort
        .sort((item1, item2) => item1.localeCompare(item2));

    case SortBy.LENGTH:
      return goodsToSort
        .sort((item1, item2) => item1.length - item2.length);

    default:
      return goodsToSort;
  }
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState(SortBy.DEFAULT);

  const goodToRender = sortGoods(goodsFromServer, sortBy);

  if (isReversed) {
    goodToRender.reverse();
  }

  const reset = () => {
    setIsReversed(false);
    setSortBy(SortBy.DEFAULT);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sortBy !== SortBy.ALPHABET })}
          onClick={() => setSortBy(SortBy.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortBy !== SortBy.LENGTH })}
          onClick={() => setSortBy(SortBy.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning',
            { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
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
        {goodToRender.map(good => (
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
