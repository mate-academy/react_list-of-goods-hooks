import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import classNames from 'classnames';
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

  visibleGoods.sort((food1, food2) => {
    switch (sortType) {
      case SortType.ALPABET:
        return food1.localeCompare(food2);

      case SortType.LENGTH:
        return food1.length - food2.length;

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
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSort] = useState(SortType.NONE);

  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  const reset = sortType !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPABET },
          )}
          onClick={() => {
            setReversed(false);
            setSort(SortType.ALPABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => {
            setReversed(false);
            setSort(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setReversed(!isReversed)}
        >
          Reverse
        </button>

        { reset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReversed(false);
              setSort(SortType.NONE);
            }}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        <ul>
          {visibleGoods.map(goods => (
            <li key={goods} data-cy="Good">
              {goods}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
