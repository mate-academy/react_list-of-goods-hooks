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

  visibleGoods.sort((currentGoods, nextGoods) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return currentGoods.localeCompare(nextGoods);
      case SortType.LENGTH:
        return currentGoods.length - nextGoods.length;
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
  const [sortType, sortBy] = useState(SortType.NONE);
  const [isReversed, reverse] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={() => {
            sortBy(SortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => {
            sortBy(SortType.LENGTH);
          }}
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
            reverse(() => {
              return !isReversed;
            });
          }}
        >
          Reverse
        </button>

        {
          (sortType !== SortType.NONE || isReversed)
          && (
            <button
              type="button"
              className="button is-danger"
              onClick={() => {
                sortBy(SortType.NONE);
                reverse(false);
              }}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {
          getReorderedGoods(goodsFromServer, { sortType, isReversed })
            .map((good) => {
              return (
                <li key={good} data-cy="Good">
                  {good}
                </li>
              );
            })
        }
      </ul>
    </div>
  );
};
