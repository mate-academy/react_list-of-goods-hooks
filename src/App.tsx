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
      case SortType.ALPHABET:
        return a.localeCompare(b);

      case SortType.LENGTH:
        return a.length - b.length;

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
  const [isReversed, handleReverse] = useState(false);
  const [sortType, changeSortType] = useState(SortType.NONE);

  const handleReset = () => {
    changeSortType(SortType.NONE);
    handleReverse(false);
  };

  const goods = getReorderedGoods(goodsFromServer, { isReversed, sortType });
  const resetButtonVisible = isReversed || sortType !== SortType.NONE;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            classNames('button is-info', {
              'is-light': sortType !== SortType.ALPHABET,
            })
          }
          onClick={() => changeSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            classNames('button is-success', {
              'is-light': sortType !== SortType.LENGTH,
            })
          }
          onClick={() => changeSortType(SortType.LENGTH)}
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
