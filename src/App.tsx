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
  None = '',
  Alphabetically = 'alphabetically',
  ByLength = 'length',
}

function getGoodsSorted(
  goodsList: Array<string>,
  sortBy: SortType,
  reverse: boolean,
): Array<string> {
  const result: Array<string> = [...goodsList];

  const multiplier: number = reverse ? -1 : 1;

  switch (sortBy) {
    case SortType.None: {
      if (reverse) {
        return result.reverse();
      }

      return result;
    }

    case SortType.Alphabetically: {
      return result.sort(
        (a: string, b: string): number => a.localeCompare(b) * multiplier,
      );
    }

    case SortType.ByLength: {
      return result.sort((a: string, b: string): number => {
        if (a.length === b.length) {
          return a.localeCompare(b) * multiplier;
        }

        return (a.length - b.length) * multiplier;
      });
    }

    default:
      throw new Error('Unknown sort type');
  }
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.None);
  const [reverseSort, setReverseSort] = useState<boolean>(false);

  const goods = getGoodsSorted(goodsFromServer, sortBy, reverseSort);

  function handleSortAlphabetically() {
    setSortBy((prev: SortType) =>
      prev === SortType.Alphabetically
        ? SortType.None
        : SortType.Alphabetically,
    );
  }

  function handleSortByLength() {
    setSortBy((prev: SortType) =>
      prev === SortType.ByLength ? SortType.None : SortType.ByLength,
    );
  }

  function handleReverseSort() {
    setReverseSort((prev: boolean) => !prev);
  }

  function handleReset() {
    setSortBy(SortType.None);
    setReverseSort(false);
  }

  const showReset = sortBy !== SortType.None || reverseSort;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortBy !== SortType.Alphabetically,
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortBy !== SortType.ByLength,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !reverseSort,
          })}
          onClick={handleReverseSort}
        >
          Reverse
        </button>

        {showReset && (
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
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
