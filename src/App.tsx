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

  if (sortType) {
    visibleGoods.sort((goodA, goodB) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return goodA.localeCompare(goodB);

        case SortType.LENGTH:
          return goodA.length - goodB.length;

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
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const sortAlphabetically = () => {
    setSortType(SortType.ALPHABET);
    setIsVisible(true);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
    setIsVisible(true);
  };

  const reverse = () => {
    setIsReversed(reversed => !reversed);
    setIsVisible(!isReversed || !!sortType);
  };

  const resetGoods = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
    setIsVisible(false);
  };

  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info',
            { 'is-light': sortType !== SortType.ALPHABET })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success',
            { 'is-light': sortType !== SortType.LENGTH })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning',
            { 'is-light': !isReversed })}
          onClick={reverse}
        >
          Reverse
        </button>

        {isVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
