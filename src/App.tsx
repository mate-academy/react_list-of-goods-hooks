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

function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods].sort((good1, good2) => {
    if (sortType === SortType.ALPABET) {
      return good1.localeCompare(good2);
    }

    if (sortType === SortType.LENGTH) {
      return good1.length - good2.length;
    }

    return 1;
  });

  if (isReversed) {
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, reverse] = useState(false);

  let goods = getReorderedGoods(goodsFromServer, {sortType, isReversed});

  return (
    <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={classNames(
              'button',
              'is-info',
              { 'is-light': sortType !== SortType.ALPABET },
            )}
            onClick={() => setSortType(SortType.ALPABET)}
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
            onClick={() => setSortType(SortType.LENGTH)}
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
            onClick={() => reverse(!isReversed)}
          >
            Reverse
          </button>

          {isReversed || sortType !== SortType.NONE
            ? (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={() => {
                  reverse(false);
                  setSortType(SortType.NONE);
                }}
              >
                Reset
              </button>
            )
            : ('')}
        </div>

        <ul>
          <ul>
            {goods.map(good => (
              <li key={good} data-cy="Good">{good}</li>
            ))}
          </ul>
        </ul>
      </div>
  );
};
