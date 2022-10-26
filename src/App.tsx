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

export function getReorderedGoods(
  goods: string[],
  sortType: number,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((currentGood: string, nextGood: string) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return currentGood.localeCompare(nextGood);

      case SortType.LENGTH:
        return currentGood.length - nextGood.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC<{}> = () => {
  const [isReversed, setIsReverse] = useState(false);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const isResetButtonVisible = sortType !== SortType.NONE || isReversed;

  const visibleItems = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  const sortByAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reverseList = () => {
    setIsReverse(!isReversed);
  };

  const resetList = () => {
    setSortType(SortType.NONE);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortByAlphabet}
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => {
            reverseList();
          }}
          className={classNames(
            'button',
            'is-warning',
            {
              'is-light': !isReversed,
            },
          )}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            onClick={resetList}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleItems.map(good => (
            <li
              key={good}
              data-cy="Good"
            >
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
