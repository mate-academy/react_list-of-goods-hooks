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

function getReorderedGoods(
  goods: string[],
  reverse: boolean,
  sort: SortType,
): string[] {
  const visibleGoods = [...goods];

  visibleGoods.sort((a, b) => {
    switch (sort) {
      case SortType.ALPHABET:
        return a.localeCompare(b);

      case SortType.LENGTH:
        return a.length - b.length;

      default:
        return 0;
    }
  });

  if (reverse) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [reversedList, setReversedList] = useState(false);
  const [sortTypesList, setSortType] = useState(SortType.NONE);

  const sortByAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const listReverse = () => {
    setReversedList((reverse) => !reverse);
  };

  const resetSettings = () => {
    setSortType(SortType.NONE);
    setReversedList(false);
  };

  const sortedList = getReorderedGoods(
    goodsFromServer,
    reversedList,
    sortTypesList,
  );

  const isModified = sortTypesList !== SortType.NONE || reversedList;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            classNames(
              'button is-info',
              { 'is-light': sortTypesList !== SortType.ALPHABET },
            )
          }
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortTypesList !== SortType.LENGTH },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !reversedList },
          )}
          onClick={listReverse}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSettings}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {sortedList.map(good => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
