/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

type Good = string;

enum SortType {
  sortByAlphabet = 'alpabet sort',
  sortByLength = 'length sort',
  default = '',
}

function getChangedGoods(
  goods: Good[],
  sortType: SortType,
  isReversed: boolean,
) {
  const changedGoods = [...goods];

  if (sortType) {
    changedGoods.sort((good1, good2) => {
      switch (sortType) {
        case (SortType.sortByAlphabet):
          return good1.localeCompare(good2);

        case (SortType.sortByLength):
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    changedGoods.reverse();
  }

  return changedGoods;
}

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

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.default);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getChangedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.sortByAlphabet },
          )}
          onClick={() => setSortType(SortType.sortByAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.sortByLength },
          )}
          onClick={() => setSortType(SortType.sortByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => {
            if (!isReversed) {
              setIsReversed(true);
            } else {
              setIsReversed(false);
            }
          }}
        >
          Reverse
        </button>

        { sortType !== '' || isReversed
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortType(SortType.default);
                setIsReversed(false);
              }}
            >
              Reset
            </button>
          )
          : (
            null
          )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
