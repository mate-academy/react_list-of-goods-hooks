import React, { useState } from 'react';
import classNames from 'classnames';
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
  Alphabetically,
  Length,
}
interface SortFilter {
  sortBy: SortType | null;
  reverse: boolean;
}
function getPreparedGoods(
  goodsArray: string[],
  { sortBy, reverse }: SortFilter,
) {
  if (sortBy === null) {
    return reverse ? [...goodsArray].reverse() : [...goodsArray];
  }

  const sortedGoods = [...goodsArray].sort((good1: string, good2: string) => {
    switch (sortBy) {
      case SortType.Alphabetically:
        return good1.localeCompare(good2);
      case SortType.Length:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  return reverse ? sortedGoods.reverse() : sortedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType | null>(null);
  const [reverse, setReverse] = useState<boolean>(false);
  const preparedGoods = getPreparedGoods(goodsFromServer, { sortBy, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortBy !== SortType.Alphabetically,
          })}
          onClick={() => {
            setSortBy(SortType.Alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortBy !== SortType.Length,
          })}
          onClick={() => {
            setSortBy(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': !reverse,
          })}
          onClick={() => {
            setReverse(!reverse);
          }}
        >
          Reverse
        </button>
        {(sortBy !== null || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(null);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(fruit => {
          return (
            <li key={fruit} data-cy="Good">
              {fruit}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
