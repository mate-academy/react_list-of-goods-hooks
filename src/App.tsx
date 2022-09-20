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
  { isReversed, sortType }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((productA, productB) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return productA.localeCompare(productB);

      case SortType.LENGTH:
        return productA.length - productB.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, handleSort] = useState(SortType.NONE);
  const [isReversed, handleReverse] = useState(false);

  const handleReset = () => {
    handleSort(SortType.NONE);
    handleReverse(false);
  };

  const visibleGoods
    = getReorderedGoods(goodsFromServer, { isReversed, sortType });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => handleSort(SortType.ALPHABET)}
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => handleSort(SortType.LENGTH)}
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => handleReverse(!isReversed)}
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
        >
          Reverse
        </button>
        {(sortType !== SortType.NONE || isReversed)
          && (
            <button
              type="button"
              onClick={handleReset}
              className="button is-danger is-light"
            >
              Reset
            </button>
          )}

      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
