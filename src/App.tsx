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

// Use this function in the render to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  // To avoid the original array mutation
  let visibleGoods = [...goods];

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => (a.length - b.length));
  } else if (sortType === SortType.ALPABET) {
    visibleGoods.sort((a, b) => (a.localeCompare(b)));
  }

  if (isReversed) {
    visibleGoods = visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setisReversed] = useState(false);
  const [sortType, setsortType] = useState(SortType.NONE);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info',
            { 'is-light': sortType !== SortType.ALPABET })}
          onClick={() => (setsortType(SortType.ALPABET))}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success',
            { 'is-light': sortType !== SortType.LENGTH })}
          onClick={() => (setsortType(SortType.LENGTH))}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning',
            { 'is-light': !isReversed })}
          onClick={() => {
            if (isReversed) {
              setisReversed(false);
            } else {
              setisReversed(true);
            }
          }}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setisReversed(false);
              setsortType(SortType.NONE);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {getReorderedGoods(goodsFromServer, {
            sortType,
            isReversed,
          }).map(good => (<li data-cy="Good" key={good}>{good}</li>))}
        </ul>
      </ul>
    </div>
  );
};
