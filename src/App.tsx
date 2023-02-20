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

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((prevGood, nextGood) => (
        prevGood.localeCompare(nextGood)));
      break;

    case SortType.LENGTH:
      visibleGoods.sort((prevGood, nextGood) => (
        prevGood.length - nextGood.length));
      break;

    case SortType.NONE:
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
  const isReset = isReversed || sortType !== SortType.NONE;

  const sortedGoods = getReorderedGoods(
    goodsFromServer, { sortType, isReversed },
  );

  const handleClickSortAlpabeticaly = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleClickSortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleClickReverse = () => {
    setIsReversed(isRev => !isRev);
  };

  const handleClickReset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={handleClickSortAlpabeticaly}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={handleClickSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={handleClickReverse}
        >
          Reverse
        </button>

        {isReset && (
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
        {sortedGoods.map((good => (
          <li
            key={good}
            data-cy="Good"
          >
            { good }
          </li>
        )))}
      </ul>
    </div>
  );
};
