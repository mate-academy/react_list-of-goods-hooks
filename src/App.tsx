import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortType } from './types/SortType';

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

export const App: React.FC = () => {
  const [sortTypes, setSortTypes] = useState<Set<SortType>>(
    new Set([SortType.Default]),
  );

  const sortedGoods = useMemo(() => {
    const result = [...goodsFromServer];

    if (sortTypes.has(SortType.Alphabetical)) {
      result.sort();
    }

    if (sortTypes.has(SortType.Length)) {
      result.sort((a, b) => a.length - b.length);
    }

    if (sortTypes.has(SortType.Reverse)) {
      result.reverse();
    }

    return result;
  }, [sortTypes]);

  const handleSort = (sortType: SortType) => {
    setSortTypes(prevTypes => {
      const newTypes = new Set(prevTypes);

      if (sortType === SortType.Default) {
        return new Set([SortType.Default]);
      }

      if (newTypes.has(sortType)) {
        if (newTypes.size === 1) {
          return new Set([SortType.Default]);
        }

        newTypes.delete(sortType);
      } else {
        newTypes.delete(SortType.Default);
        newTypes.add(sortType);
      }

      return newTypes;
    });
  };

  const isActive = (sortType: SortType) => sortTypes.has(sortType);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': !isActive(SortType.Alphabetical),
          })}
          onClick={() => handleSort(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': !isActive(SortType.Length),
          })}
          onClick={() => handleSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isActive(SortType.Reverse),
          })}
          onClick={() => handleSort(SortType.Reverse)}
        >
          Reverse
        </button>

        {!isActive(SortType.Default) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleSort(SortType.Default)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
