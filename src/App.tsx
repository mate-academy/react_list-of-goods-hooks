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

  visibleGoods.sort((a, b) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return a.localeCompare(b);
      case SortType.LENGTH:
        return a.length - b.length;
      default:
        return SortType.NONE;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

type State = {
  isReversed: boolean,
  sortType: SortType,
};

export const App: React.FC<{}> = () => {
  const [sortOption, setSortOption] = useState<State>({
    isReversed: false,
    sortType: SortType.NONE,
  });

  const sortFunction = (e: React.MouseEvent, sortType: SortType) => {
    e.preventDefault();
    setSortOption((prev) => ({
      sortType,
      isReversed: prev.isReversed,
    }));
  };

  const reverse = () => {
    setSortOption((prev) => ({
      sortType: prev.sortType,
      isReversed: !prev.isReversed,
    }));
  };

  const reset = () => {
    setSortOption(() => ({
      sortType: SortType.NONE,
      isReversed: false,
    }));
  };

  const visibleGoods = getReorderedGoods(goodsFromServer, sortOption);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info',
            { 'is-light': sortOption.sortType !== SortType.ALPHABET })}
          onClick={(e) => sortFunction(e, SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success',
            { 'is-light': sortOption.sortType !== SortType.LENGTH })}
          onClick={(e) => sortFunction(e, SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning',
            { 'is-light': !sortOption.isReversed })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(sortOption.sortType !== SortType.NONE
          || sortOption.isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map((good: string) => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
