import React, { useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

const goodsFromServer = [
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

function getReorderedGoods(
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goodsFromServer];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((g1, g2) => g1.localeCompare(g2));

      break;
    case SortType.LENGTH:
      visibleGoods.sort((g1, g2) => g1.length - g2.length);

      break;
    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setType] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);
  const isReset = sortType !== SortType.NONE || isReversed;
  const sortedGoods = getReorderedGoods(
    { sortType, isReversed },
  );

  const handleReset = () => {
    setType(SortType.NONE);
    setReverse(false);
  };

  const handleSortAlphabet = () => setType(SortType.ALPHABET);

  const handleReverse = () => setReverse(reverse => !reverse);

  const handleSortLenght = () => setType(SortType.LENGTH);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            classNames(
              'button',
              'is-info',
              { 'is-light': sortType !== SortType.ALPHABET },
            )
          }
          onClick={handleSortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            classNames(
              'button',
              'is-success',
              { 'is-light': sortType !== SortType.LENGTH },
            )
          }
          onClick={handleSortLenght}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            classNames(
              'button',
              'is-warning',
              { 'is-light': !isReversed },
            )
          }
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isReset && (
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
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
