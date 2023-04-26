import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import classNames from 'classnames';
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

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((goodA, goodB) => goodA.localeCompare(goodB));
      break;
    case SortType.LENGTH:
      visibleGoods.sort((goodA, goodB) => goodA.length - goodB.length);
      break;
    default: visibleGoods; //eslint-disable-line
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const handleReverse = () => {
    setReversed(!isReversed);
  };

  const handleAlphabeticSort = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleLengthSort = () => {
    setSortType(SortType.LENGTH);
  };

  const handleReset = () => {
    setReversed(false);
    setSortType(SortType.NONE);
  };

  const currentGoods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  const resetButtonCondition = sortType !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info',
            { 'is-light': sortType !== SortType.ALPHABET })}
          onClick={handleAlphabeticSort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-warning',
            { 'is-light': sortType !== SortType.LENGTH })}
          onClick={handleLengthSort}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-danger',
            { ' is-light': !isReversed })}
          onClick={handleReverse}
        >
          Reverse
        </button>
        {resetButtonCondition && (
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
          {
            currentGoods.map(good => (
              <li data-cy="Good" key={good}>
                {good}
              </li>
            ))
          }
        </ul>
      </ul>
    </div>
  );
};
