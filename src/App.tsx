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

  visibleGoods.sort((goodFirst: string, goodSecond: string): number => {
    switch (sortType) {
      case SortType.ALPABET:
        return goodFirst.localeCompare(goodSecond);

      case SortType.LENGTH:
        return goodFirst.length - goodSecond.length;

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
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const sortByAlphabet = () => {
    setSortType(SortType.ALPABET);
  };

  const reversGoods = () => {
    setIsReversed(reverse => !reverse);
  };

  const resetGoods = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const resultGoods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            classNames(
              'button is-info',
              {
                'is-light': sortType !== SortType.ALPABET,
              },
            )
          }
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            classNames(
              'button is-success',
              {
                'is-light': sortType !== SortType.LENGTH,
              },
            )
          }
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            classNames(
              'button is-warning',
              {
                'is-light': !isReversed,
              },
            )
          }
          onClick={reversGoods}
        >
          Reverse
        </button>

        {
          (sortType !== SortType.NONE || isReversed) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetGoods}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {resultGoods.map(good => (
          <li key={good} data-cy="Good">
            { good }
          </li>
        ))}
      </ul>
    </div>
  );
};
