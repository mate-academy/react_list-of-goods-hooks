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
  sortType: SortType,
  isReversed : boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((a, b) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return a.localeCompare(b);
      case SortType.LENGTH:
        return a.length - b.length;
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
  const [sortType, sortTypeF] = useState(SortType.NONE);
  const [isReversed, isReversedF] = useState(false);

  const visibleGoods = getReorderedGoods(goodsFromServer, sortType, isReversed);
  const booleanReset = sortType !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            classNames(
              'button is-info',
              { 'is-light': sortType !== SortType.ALPHABET },
            )
          }
          onClick={() => {
            sortTypeF(SortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            classNames(
              'button is-info',
              { 'is-light': sortType !== SortType.LENGTH },
            )
          }
          onClick={() => {
            sortTypeF(SortType.LENGTH);
          }}

        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            classNames(
              'button is-info',
              { 'is-light': isReversed === false },
            )
          }
          onClick={() => {
            isReversedF(!isReversed);
          }}
        >
          Reverse
        </button>

        {booleanReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              sortTypeF(SortType.NONE);
              isReversedF(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>

    </div>
  );
};
