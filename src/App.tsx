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
  NONE = 'none',
  ALPABET = 'alpabet',
  LENGTH = 'length',
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
  console.log(sortType, isReversed);

  visibleGoods.sort((item1, item2) => {
    switch (sortType) {
      case SortType.ALPABET:
        return item1.localeCompare(item2);

      case SortType.LENGTH:
        return item1.length - item2.length;

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

  const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });

  const handleReverse = () => {
    setReversed(current => !current);
  };

  const handleReset = () => {
    setReversed(false);
    setSort(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info ',
            { 'is-light': sortType !== SortType.ALPABET },
          )}
          onClick={() => setSort(SortType.ALPABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => setSort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': isReversed === false },
          )}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map((good) => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
