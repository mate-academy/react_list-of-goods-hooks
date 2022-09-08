import React, { useState } from 'react';
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
  const visibleGoods = [...goods];

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPABET:
        return good1.localeCompare(good2);

      case SortType.LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

type Props = {
  goods: string[]
};

export const App: React.FC<Props> = () => {
  const [sortType, sorter] = useState(SortType.NONE);
  const [isReversed, reverse] = useState(false);

  const reset = () => {
    sorter(SortType.NONE);
    reverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortType !== SortType.ALPABET
              ? 'button is-info is-light'
              : 'button is-info'
          }
          onClick={() => sorter(SortType.ALPABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortType !== SortType.LENGTH
              ? 'button is-success is-light'
              : 'button is-success'
          }
          onClick={() => sorter(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed !== true
              ? 'button is-warning is-light'
              : 'button is-warning'
          }
          onClick={() => reverse(isReversed !== true)}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed === true)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => reset()}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        <ul>
          {getReorderedGoods(goodsFromServer, { isReversed, sortType })
            .map(good => <li data-cy="Good" key={good}>{good}</li>)}
        </ul>
      </ul>
    </div>
  );
};
