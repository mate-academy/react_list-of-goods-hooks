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

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((g1, g2) => g1.localeCompare(g2));
      break;

    case SortType.LENGTH:
      visibleGoods.sort((g1, g2) => g1.length - g2.length);
      break;

    case SortType.NONE:
    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getReorderedGoods(
    goodsFromServer, { sortType, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.ALPHABET)}
          type="button"
          className={classNames(
            'button',
            'is-info',
            {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.LENGTH)}
          type="button"
          className={classNames(
            'button',
            'is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(current => !current)}
          type="button"
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

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            onClick={() => {
              setSortType(SortType.NONE); setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
