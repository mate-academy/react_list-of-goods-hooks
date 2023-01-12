import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SortType.LENGTH:
      visibleGoods.sort((good1, good2) => good1.length - good2.length);
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
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const myPreparedProducts = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );
  const isResetVisible = isReversed === true || (sortType !== SortType.NONE);

  const handleClickSortAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleClickSortLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleClickReverce = () => {
    setIsReversed(!isReversed);
  };

  const handleClickReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
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
            cn(
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
            cn(
              'button is-warning',
              { 'is-light': isReversed !== true },
            )
          }
          onClick={handleClickReverce}
        >
          Reverse
        </button>

        {isResetVisible
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
        {myPreparedProducts.map(product => (
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
