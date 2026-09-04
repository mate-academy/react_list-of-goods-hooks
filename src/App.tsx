import React, { useState, useMemo } from 'react';
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

enum SortBy {
  alphabetically = 'alphabetically',
  length = 'length',
  no_sort = 'none',
}

function sort(data: string[], sortBy: SortBy): string[] {
  const dataCopy = [...data];

  switch (sortBy) {
    case SortBy.length:
      return dataCopy.sort((a, b) => a.length - b.length);
    case SortBy.alphabetically:
      return dataCopy.sort((a, b) => a.localeCompare(b));
    default:
      return data;
  }
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.no_sort);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = useMemo(() => {
    let result = [...goodsFromServer];

    if (sortBy !== SortBy.no_sort) {
      result = sort(result, sortBy);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  }, [sortBy, isReversed]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', {
            'is-info': sortBy === SortBy.alphabetically,
            'is-info is-light': sortBy !== SortBy.alphabetically,
          })}
          onClick={() => {
            setSortBy(SortBy.alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', {
            'is-success': sortBy === SortBy.length,
            'is-success is-light': sortBy !== SortBy.length,
          })}
          onClick={() => {
            setSortBy(SortBy.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', {
            'is-warning': isReversed,
            'is-warning is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortBy !== SortBy.no_sort || isReversed) && (
          <button
            type="button"
            className={cn('button', {
              'is-danger': sortBy === SortBy.no_sort && !isReversed,
              'is-danger is-light': !(sortBy === SortBy.no_sort && !isReversed),
            })}
            onClick={() => {
              setSortBy(SortBy.no_sort);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((item: string) => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
