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

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortBy] = useState(SortType.NONE);

  const setSortNone = () => {
    setSortBy(SortType.NONE);
    setReversed(false);
  };

  const setReverse = () => {
    setReversed(!isReversed);
  };

  const setSortByAlphabet = () => {
    setSortBy(SortType.ALPHABET);
  };

  const setSortByLength = () => {
    setSortBy(SortType.LENGTH);
  };

  const reorderedGoods = getReorderedGoods(
    goodsFromServer,
    { isReversed, sortType },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={setSortByAlphabet}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={setSortByLength}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={setReverse}
        >
          Reverse
        </button>
        {(sortType || isReversed)
            && (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={setSortNone}
              >
                Reset
              </button>
            )}
      </div>
      <ul>
        {reorderedGoods.map(list => (
          <li data-cy="Good" key={list}>
            {list}
          </li>
        ))}
      </ul>
    </div>
  );
};
