import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import claccNames from 'classnames';

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
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SortType.LENGTH:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const goods = getReorderedGoods(goodsFromServer, { isReversed, sortType });

  const reverse = () => {
    setReverse(!isReversed);
  };

  const sortByAlpabet = () => {
    setSortType(SortType.ALPABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reset = () => {
    setSortType(SortType.NONE);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={claccNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPABET },
          )}
          onClick={sortByAlpabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={claccNames(
            'button is-success ',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={claccNames(
            'button is-warning  ',
            { 'is-light': isReversed === false },
          )}
          onClick={reverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
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
          {
            goods.map((good) => (
              <li
                data-cy="Good"
                key={good}
              >
                {good}
              </li>
            ))
          }
        </ul>
      </ul>
    </div>
  );
};
