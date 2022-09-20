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

  visibleGoods.sort((a1, a2) => {
    switch (sortType) {
      case SortType.ALPABET: {
        return a1.localeCompare(a2);
      }

      case SortType.LENGTH: {
        return a1.length - a2.length;
      }

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
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const ReorderedGoods = getReorderedGoods(
    goodsFromServer,
    { isReversed, sortType },
  );

  const resetBtn = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button', 'is-info',
            {
              'is-light': !(sortType === SortType.ALPABET),
            },
          )}
          onClick={() => setSortType(SortType.ALPABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button', 'is-success',
            {
              'is-light': !(sortType === SortType.LENGTH),
            },
          )}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button', 'is-warning',
            {
              'is-light': (isReversed === false),
            },
          )}
          onClick={() => setIsReversed(isReversed !== true)}
        >
          Reverse

        </button>
        {(isReversed || sortType !== SortType.NONE)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => resetBtn()}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        <ul>
          {ReorderedGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
