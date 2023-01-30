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

export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case ('Alphabet'):
      visibleGoods.sort((good1, good2) => (
        good1.localeCompare(good2)));
      break;
    case ('Length'):
      visibleGoods.sort((good1, good2) => (
        good1.length - good2.length));
      break;

    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

enum SortType {
  NONE = 'None',
  ALPHABET = 'Alphabet',
  LENGTH = 'Length',
}

export const App: React.FC = () => {
  const [isReversed, changeReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );
  const isNotDefault = isReversed || (sortType !== 'None');

  const reverse = () => {
    changeReverse(!isReversed);
  };

  const setAlphabetSort = () => {
    setSortType(SortType.ALPHABET);
  };

  const setLengthSort = () => {
    setSortType(SortType.LENGTH);
  };

  const reset = () => {
    setSortType(SortType.NONE);
    changeReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== 'Alphabet' },
          )}
          onClick={setAlphabetSort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== 'Length' },
          )}
          onClick={setLengthSort}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={reverse}
        >
          Reverse
        </button>

        {isNotDefault && (
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
          {visibleGoods.map(good => (
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
