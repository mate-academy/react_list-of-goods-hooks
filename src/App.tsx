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
  sortType: SortType;
};

export function getReorderedGoods(
  goods: string[],
  { sortType }: ReorderOptions,
) {
  const visibleGoods = [...goods].sort((GoodA, GoodB) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return GoodA.localeCompare(GoodB);

      case SortType.LENGTH:
        return GoodA.length - GoodB.length || GoodA.localeCompare(GoodB);

      case SortType.NONE:
      default:
        return 0;
    }
  });

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);

  const setSortByAlphabet = () => setSortType(SortType.ALPHABET);
  const setSortByLength = () => setSortType(SortType.LENGTH);
  const reverseGoods = () => setReverse((state) => !state);
  const resetSort = () => {
    setSortType(SortType.NONE);
    setReverse(false);
  };

  const reorderedGoods = getReorderedGoods(goodsFromServer, {
    sortType,
  });

  if (isReversed) {
    reorderedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={setSortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={setSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            {
              'is-light': !isReversed,
            },
          )}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSort}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {reorderedGoods.map((good) => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
