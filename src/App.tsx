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
    visibleGoods.sort((g1, g2) => g1.localeCompare(g2));
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((g1, g2) => g1.length - g2.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReverced] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const myPrepareProducts = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );
  const visibleReset = isReversed === true || (sortType !== SortType.NONE);

  const handleClickSortAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleClickSortLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleClickReverce = () => {
    setIsReverced(!isReversed);
  };

  const handleClickReset = () => {
    setSortType(SortType.NONE);
    setIsReverced(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            classNames(
              'button is-info',
              { 'is-light': sortType !== SortType.ALPHABET },
            )
          }
          onClick={handleClickSortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            classNames(
              'button is-success',
              { 'is-light': sortType !== SortType.LENGTH },
            )
          }
          onClick={handleClickSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            classNames(
              'button is-warning',
              { 'is-light': isReversed !== true },
            )
          }
          onClick={handleClickReverce}
        >
          Reverse
        </button>

        {visibleReset
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={handleClickReset}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {myPrepareProducts.map(product => (
          <li
            key={product}
            data-cy="Good"
            className="product"
          >
            {product}
          </li>
        ))}
      </ul>
    </div>
  );
};
