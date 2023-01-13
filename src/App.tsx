import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  NONE,
  ALPHABET,
  LENGTH,
}

export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  if (sortType) {
    visibleGoods.sort((g1, g2) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return g1.localeCompare(g2);

        case SortType.LENGTH:
          return g1.length - g2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSort] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const sortByAlphabet = () => {
    setSort(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSort(SortType.LENGTH);
  };

  const reset = () => {
    setIsReversed(false);
    setSort(SortType.NONE);
  };

  const visibleGoods = getReorderedGoods(goodsFromServer, sortType, isReversed);
  const resetCheck = isReversed || sortType !== SortType.NONE;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info ', { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={() => sortByAlphabet()}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => sortByLength()}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => reverse()}
        >
          Reverse
        </button>

        {resetCheck && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
