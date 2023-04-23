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

  visibleGoods.sort((a, b) => {
    switch (sortType) {
      case 1:
        return a.localeCompare(b);

      case 2:
        return a.length - b.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, handleReverse] = useState(false);
  const [sortType, changeSortType] = useState(0);

  const handleReset = () => {
    changeSortType(0);
    handleReverse(false);
  };

  const goods = getReorderedGoods(goodsFromServer, { isReversed, sortType });
  const resetButtonVisible = isReversed || sortType !== 0;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            classNames('button is-info', {
              'is-light': sortType !== 1,
            })
          }
          onClick={() => changeSortType(1)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            classNames('button is-success', {
              'is-light': sortType !== 2,
            })
          }
          onClick={() => changeSortType(2)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            classNames('button is-warning', {
              'is-light': !isReversed,
            })
          }
          onClick={() => handleReverse(!isReversed)}
        >
          Reverse
        </button>

        {resetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleReset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
