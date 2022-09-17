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
  ALPABET,
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

  visibleGoods.sort((firstProduct, secondProduct) => {
    switch (sortType) {
      case SortType.ALPABET:
        return firstProduct.localeCompare(secondProduct);

      case SortType.LENGTH:
        return firstProduct.length - secondProduct.length;

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
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const handleAlpabetSort = () => setSortType(SortType.ALPABET);

  const handleLengthSort = () => setSortType(SortType.LENGTH);

  const handleReversSort = () => setIsReversed(!isReversed);

  const handleResetSort = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const renderItems = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPABET },
          )}
          onClick={handleAlpabetSort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={handleLengthSort}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={handleReversSort}
        >
          Reverse
        </button>
        {sortType !== SortType.NONE || isReversed
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={handleResetSort}
            >
              Reset
            </button>
          ) : ''}
      </div>
      <ul>
        {renderItems.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
