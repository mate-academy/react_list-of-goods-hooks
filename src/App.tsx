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
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  // Sort goods if needed
  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort(
      (firstGood, secondGood) => firstGood.localeCompare(secondGood),
    );
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort(
      (firstGood, secondGood) => firstGood.length - secondGood.length,
    );
  }

  // Reverse goods if needed
  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReversing] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const isChangesMade = isReversed || sortType !== SortType.NONE;

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
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            classNames(
              'button is-success',
              { 'is-light': sortType !== SortType.LENGTH },
            )
          }
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            classNames(
              'button is-warning',
              { 'is-light': !isReversed },
            )
          }
          onClick={() => setReversing(current => !current)}
        >
          Reverse
        </button>

        {
          isChangesMade && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortType(SortType.NONE);
                setReversing(false);
              }}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {
          getReorderedGoods(
            goodsFromServer, { isReversed, sortType },
          ).map(good => (<li key={good} data-cy="Good">{`${good}`}</li>))
        }
      </ul>
    </div>
  );
};
