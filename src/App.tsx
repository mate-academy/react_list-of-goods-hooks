import React, { useState } from 'react';
import classNames from 'classnames';
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

  visibleGoods.sort((item1, item2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return item1.localeCompare(item2);

      case SortType.LENGTH:
        return item1.length - item2.length;

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

  const allGoods
      = getReorderedGoods(goodsFromServer, { isReversed, sortType });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={() => handleSort(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => handleSort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => handleReverse(!isReversed)}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed)
          && (
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
        <ul>
          {allGoods.map(item => (
            <li
              key={item}
              data-cy="Good"
            >
              {item}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
