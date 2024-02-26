import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  let visibleGoods = [...goods];

  if (sortType === SortType.LENGTH) {
    visibleGoods = [...goods].sort((a, b) => {
      return a.length - b.length;
    });
  } else if (sortType === SortType.ALPHABET) {
    visibleGoods = [...goods].sort((a, b) => {
      return a.localeCompare(b);
    });
  } else if (sortType === SortType.NONE) {
    visibleGoods = [...goods];
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isResetButtonVisible, setIsResetButtonVisible] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const reorderedGoods = getReorderedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });

  const sortByAplhabet = () => setSortType(SortType.ALPHABET);

  const sortByLength = () => setSortType(SortType.LENGTH);

  const reset = () => setSortType(SortType.NONE);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${cn({
            'is-light': sortType !== SortType.ALPHABET,
          })}`}
          onClick={() => {
            sortByAplhabet();
            setIsResetButtonVisible(true);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${cn({
            'is-light': sortType !== SortType.LENGTH,
          })}`}
          onClick={() => {
            sortByLength();
            setIsResetButtonVisible(true);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({
            'is-light': isReversed !== true,
          })}`}
          onClick={() => {
            setIsReversed(!isReversed);
            setIsResetButtonVisible(true);
          }}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              reset();
              setIsResetButtonVisible(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {reorderedGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
