import React, { useState } from 'react';
import cn from 'classnames';
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
  sortType: SortType;
  isReversed: boolean;
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((prev, curr) => {
    if (sortType === SortType.ALPHABET) {
      return prev.localeCompare(curr);
      // eslint-disable-next-line
    } else if (sortType === SortType.LENGTH) {
      return prev.length - curr.length;
    }

    return 0;
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

export const App: React.FC<{}> = () => {
  const [isReversed, reverseList] = useState(false);
  const [sortType, sortItems] = useState(SortType.NONE);

  const goods = getReorderedGoods(goodsFromServer, { isReversed, sortType });
  const activeRemoveButton = isReversed || sortType !== SortType.NONE;

  return (
    <body>
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={cn('button is-info', {
              'is-light': sortType !== SortType.ALPHABET,
            })}
            onClick={() => sortItems(SortType.ALPHABET)}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={cn('button is-success', {
              'is-light': sortType !== SortType.LENGTH,
            })}
            onClick={() => sortItems(SortType.LENGTH)}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={cn('button is-warning', {
              'is-light': isReversed !== true,
            })}
            onClick={() => reverseList(!isReversed)}
          >
            Reverse
          </button>

          {activeRemoveButton && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                reverseList(false);
                sortItems(SortType.NONE);
              }}
            >
              Reset
            </button>
          )}
        </div>

        <ul>
          <ul>
            {goods.map((good) => (
              <li key={good} data-cy="Good">{good}</li>
            ))}
          </ul>
        </ul>
      </div>
    </body>
  );
};
