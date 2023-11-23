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

  // eslint-disable-next-line no-console
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

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const sortByAlpabet = () => {
    setSortType(SortType.ALPABET);
  };

  const reset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const reverse = () => {
    setIsReversed((current) => !current);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortByAlpabet}
          className={
            classNames('button is-info',
              { 'is-light': sortType !== SortType.ALPABET })
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={
            classNames('button is-success',
              { 'is-light': sortType !== SortType.LENGTH })
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverse}
          className={
            classNames('button is-warning',
              { 'is-light': !isReversed })
          }
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE) && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
