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
  const [firstState, secondState] = useState<State>({
    isReversed: false,
    sortType: SortType.NONE,
  });

  const sortAlphabet = () => {
    secondState((prev) => ({
      sortType: SortType.ALPHABET,
      isReversed: prev.isReversed,
    }));
  };

  const sortLength = () => {
    secondState((prev) => ({
      sortType: SortType.LENGTH,
      isReversed: prev.isReversed,
    }));
  };

  const reverse = () => {
    secondState((prev) => ({
      sortType: prev.sortType,
      isReversed: !prev.isReversed,
    }));
  };

  const reset = () => {
    secondState(() => ({
      sortType: SortType.NONE,
      isReversed: false,
    }));
  };

  const visibleGoods = getReorderedGoods(goodsFromServer, firstState);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info',
            { 'is-light': firstState.sortType !== SortType.ALPHABET })}
          onClick={sortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success',
            { 'is-light': firstState.sortType !== SortType.LENGTH })}
          onClick={sortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning',
            { 'is-light': firstState.isReversed === false })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(firstState.sortType !== SortType.NONE
          || firstState.isReversed === true)
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
