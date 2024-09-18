import React from 'react';
import { useState } from 'react';
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
const REVERSE = false;

enum SortType {
  RESET_VALUE = '',
  SORT_BY_NAME = 'name',
  SORT_BY_LENGTH = 'length',
}

interface SortCriteria {
  sortBy: SortType;
  isReversed: boolean;
}

function sortGoods(
  goods: string[],
  { sortBy: criteria, isReversed }: SortCriteria,
) {
  let sortedGoods;

  switch (criteria) {
    case SortType.SORT_BY_NAME:
      sortedGoods = goods.toSorted((a, b) => a.localeCompare(b));
      break;
    case SortType.SORT_BY_LENGTH:
      sortedGoods = goods.toSorted((a, b) => a.length - b.length);
      break;

    default:
      sortedGoods = [...goods];
  }

  if (isReversed) {
    sortedGoods = sortedGoods.toReversed();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.RESET_VALUE);
  const [isReversed, setIsReversed] = useState(REVERSE);

  const sortedGoods = sortGoods(goodsFromServer, { sortBy, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': SortType.SORT_BY_NAME !== sortBy,
          })}
          onClick={() => setSortBy(SortType.SORT_BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': SortType.SORT_BY_LENGTH !== sortBy,
          })}
          onClick={() => setSortBy(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-info"
            onClick={() => {
              setSortBy(SortType.RESET_VALUE);
              setIsReversed(REVERSE);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
