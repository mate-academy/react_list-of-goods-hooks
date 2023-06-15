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

  visibleGoods.sort((good1, good2): number => {
    switch (sortType) {
      case SortType.ALPHABET:
        return good1.localeCompare(good2);

      case SortType.LENGTH:
        return good1.length - good2.length;

      case SortType.NONE:
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

  const sortByAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reverseGoods = () => {
    setIsReversed((currentIsReversed) => !currentIsReversed);
  };

  const resetSort = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const sortedGoods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  const canReset = sortType !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={classNames('button is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverseGoods}
          className={classNames('button is-warning', {
            'is-light': isReversed === false,
          })}
        >
          Reverse
        </button>

        {canReset
          ? (
            <button
              onClick={resetSort}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )
          : null}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
