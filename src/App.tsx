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

  switch (sortType) {
    case SortType.ALPABET:
      visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SortType.LENGTH:
      visibleGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  return isReversed ? visibleGoods.reverse() : visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const isClicked = !(!isReversed && !sortType);

  const sortedGoods = getReorderedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });

  const resetFilter = () => {
    setReverse(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            classNames('button is-info',
              { 'is-light': sortType !== SortType.ALPABET })
          }
          onClick={() => setSortType(SortType.ALPABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            classNames('button is-success',
              { 'is-light': sortType !== SortType.LENGTH })
          }
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            classNames('button is-danger',
              { 'is-light': !isReversed })
          }
          onClick={() => setReverse(!isReversed)}
        >
          Reverse
        </button>

        {isClicked && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => resetFilter()}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        <ul>
          {sortedGoods.map((good) => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
