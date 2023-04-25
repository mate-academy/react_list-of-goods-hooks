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
  sortType: SortType;
  isReversed: boolean;
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  const isAlphabeticSort = sortType === SortType.ALPHABET;
  const isLengthSort = sortType === SortType.LENGTH;

  switch (true) {
    case isAlphabeticSort:
      visibleGoods.sort((g1, g2) => g1.localeCompare(g2));
      break;

    case isLengthSort:
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
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const isResetButtonShown = sortType !== SortType.NONE || isReversed;
  const isAlphabeticSort = sortType === SortType.ALPHABET;
  const isLengthSort = sortType === SortType.LENGTH;

  const goods = getReorderedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });

  const handleReset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const handleReverse = () => {
    setIsReversed((currentReversed) => !currentReversed);
  };

  const handleSort = (type: SortType) => {
    setSortType(type);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': !isAlphabeticSort,
          })}
          onClick={() => handleSort(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': !isLengthSort,
          })}
          onClick={() => handleSort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isResetButtonShown && (
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
        {goods.map((good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
