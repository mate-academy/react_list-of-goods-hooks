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
  const visibleGoods = [...goods].sort((g1, g2) => {
    switch (sortType) {
      case SortType.ALPABET:
        return g1.localeCompare(g2);

      case SortType.LENGTH:
        return g1.length - g2.length;

      case SortType.NONE:
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
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });

  const reset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortType(SortType.ALPABET)}
          className={classNames(
            'button is-info',
            {
              'is-light': sortType !== SortType.ALPABET,
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortType(SortType.LENGTH)}
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
          onClick={() => setIsReversed(!isReversed)}
          className={classNames(
            'button is-warning',
            {
              'is-light': !isReversed,
            },
          )}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE) && (
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
          {goods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
