import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

export enum SortType {
  Default = 'default',
  Alphabetically = 'alphabetically',
  Reverse = 'reverse',
  ByLength = 'byLength',
}

export const App: React.FC = () => {
  const [currentSort, setCurrentSort] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const getSortedGoods = (): string[] => {
    const sorted = [...goodsFromServer];

    switch (currentSort) {
      case SortType.Alphabetically:
        sorted.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.ByLength:
        sorted.sort((a, b) => a.length - b.length);
        break;

      default:
        break;
    }

    if (isReversed) {
      sorted.reverse();
    }

    return sorted;
  };

  const visibleGoods = getSortedGoods();

  const handleReset = () => {
    setCurrentSort(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': currentSort !== SortType.Alphabetically,
          })}
          onClick={() => setCurrentSort(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': currentSort !== SortType.ByLength,
          })}
          onClick={() => setCurrentSort(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(currentSort !== SortType.Default || isReversed) && (
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
