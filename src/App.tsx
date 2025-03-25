/* eslint-disable prefer-const */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { ReorderOptions, SortType } from './types/types';

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

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => a.length - b.length);
  } else if (sortType === SortType.NONE && isReversed === false) {
    return visibleGoods;
  }

  if (isReversed === true) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  let [sortType, setSortType] = useState(SortType.NONE);
  let [isReversed, setIsReversed] = useState(false);

  const goodList = getReorderedGoods(goodsFromServer, {
    sortType,
    isReversed,
  }).map(good => {
    return (
      <li key={good} data-cy="Good">
        {good}
      </li>
    );
  });

  const resetSort = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {sortType === SortType.NONE && isReversed === false ? (
          ''
        ) : (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSort}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>{goodList}</ul>
      </ul>
    </div>
  );
};
