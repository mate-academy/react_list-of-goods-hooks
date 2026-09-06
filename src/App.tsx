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

enum SortType {
  alphabetically = 'alphabetically',
  length = 'length',
  no_sort = 'none',
}

function sortGoods(data: string[], sortByType: SortType): string[] {
  const dataCopy = [...data];

  switch (sortByType) {
    case SortType.length:
      return dataCopy.sort((a, b) => a.length - b.length);
    case SortType.alphabetically:
      return dataCopy.sort((a, b) => a.localeCompare(b));
    default:
      return data;
  }
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.no_sort);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = useMemo(() => {
    let result = [...goodsFromServer];

    if (sortType !== SortType.no_sort) {
      result = sortGoods(result, sortType);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  }, [sortType, isReversed]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', {
            'is-info': sortType === SortType.alphabetically,
            'is-info is-light': sortType !== SortType.alphabetically,
          })}
          onClick={() => {
            setSortType(SortType.alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', {
            'is-success': sortType === SortType.length,
            'is-success is-light': sortType !== SortType.length,
          })}
          onClick={() => {
            setSortType(SortType.length);
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

        {(sortType !== SortType.no_sort || isReversed) && (
          <button
            type="button"
            className={cn('button', {
              'is-danger': sortType === SortType.no_sort && !isReversed,
              'is-danger is-light': !(
                sortType === SortType.no_sort && !isReversed
              ),
            })}
            onClick={() => {
              setSortType(SortType.no_sort);
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
