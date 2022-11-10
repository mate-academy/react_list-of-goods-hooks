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

  visibleGoods.sort((item1, item2) => {
    switch (sortType) {
      case SortType.LENGTH:
        return item1.length - item2.length;

      case SortType.ALPHABET:
        return item1.localeCompare(item2);

      default:
        return SortType.NONE;
    }
  });

  if (isReversed) {
    return visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  function sortAlphabetically() {
    setSortType(SortType.ALPHABET);
  }

  function sortLength() {
    setSortType(SortType.LENGTH);
  }

  function reversing() {
    setIsReversed(previsReversed => !previsReversed);
  }

  function resetting() {
    setSortType(SortType.NONE);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortAlphabetically}
          className={classNames(
            'button is-info',
            {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortLength}
          className={classNames(
            'button is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reversing}
          className={classNames(
            'button is-warning',
            {
              'is-light': isReversed === false,
            },
          )}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed === true) && (
          <button
            type="button"
            onClick={resetting}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getReorderedGoods(goodsFromServer, { sortType, isReversed })
          .map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
      </ul>
    </div>
  );
};
