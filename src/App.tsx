import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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
  Reset,
}

const getSortedGoods = (sortType: SortType, reversed: boolean): string[] => {
  let sortedGoods = [...goodsFromServer];

  sortedGoods.sort((a, b) => {
    switch (sortType) {
      case SortType.Alphabetically:
        return a.localeCompare(b);
      case SortType.Length:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (reversed) {
    sortedGoods = sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Reset);
  const [reversed, setReversed] = useState<boolean>(false);

  const visibleGoods = getSortedGoods(sortType, reversed);

  const handleSort = (type: SortType): void => {
    setSortType(type);
  };

  const handleReverse = (): void => {
    setReversed(!reversed);
  };

  const handleReset = (): void => {
    setReversed(false);
    setSortType(SortType.Reset);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => handleSort(SortType.Alphabetically)}
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.Alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => handleSort(SortType.Length)}
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={cn('button', 'is-warning', { 'is-light': !reversed })}
        >
          Reverse
        </button>
        {(sortType !== SortType.Reset || reversed) && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
