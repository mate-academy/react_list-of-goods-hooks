import * as React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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

export enum SortType {
  default = '',
  sortByAlphabet = 'alphabet',
  sortByLength = 'length',
  reverse = 'desc',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.default);
  const [isReversed, setIsReversed] = useState(false);
  const isChanged = sortType !== SortType.default || isReversed;

  function handleSortAlphabetically() {
    setSortType(SortType.sortByAlphabet);
  }

  function handleSortByLength() {
    setSortType(SortType.sortByLength);
  }

  function handleReverse() {
    setIsReversed(goods => !goods);
  }

  function handleReset() {
    setSortType(SortType.default);
    setIsReversed(false);
  }

  const visibleGoods = [...goodsFromServer];

  if (sortType === SortType.sortByAlphabet) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.sortByLength) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.sortByAlphabet,
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.sortByLength,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
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
