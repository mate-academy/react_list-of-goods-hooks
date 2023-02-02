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

  // HOW BETTER CODED SORTING DIFFERENT TYPE DATA??? FIRST OR SECOND EXAMPLE???

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
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const sortByAlph = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortByLen = () => {
    setSortType(SortType.LENGTH);
  };

  const reverse = () => {
    setIsReversed(current => !current);
  };

  const getByDefault = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    { isReversed, sortType },
  );
  const isReset = sortType !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortType !== SortType.ALPHABET })}
          onClick={sortByAlph}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortType !== SortType.LENGTH })}
          onClick={sortByLen}

        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': !isReversed })}
          onClick={reverse}

        >
          Reverse
        </button>

        { isReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={getByDefault}

          >
            Reset
          </button>
        ) }

      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
