import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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
  None = 'none',
  Alphabetically = 'alpha',
  ByLength = 'length',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const handleSortAlphabetically = (): void => {
    setSortType(SortType.Alphabetically);
  };

  const handleSortByLength = (): void => {
    setSortType(SortType.ByLength);
  };

  const handleToggleReverse = (): void => {
    setIsReversed(prev => !prev);
  };

  const handleReset = (): void => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  const getSortedList = (goods: string[]) => {
    const listCopy = [...goods];

    if (sortType === SortType.Alphabetically) {
      listCopy.sort((good1, good2) => good1.localeCompare(good2));
    }

    if (sortType === SortType.ByLength) {
      listCopy.sort((good1, good2) => good1.length - good2.length);
    }

    if (isReversed) {
      listCopy.reverse();
    }

    return listCopy;
  };

  const sortedList = getSortedList(goodsFromServer);
  const isChanged = sortType !== SortType.None || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={handleSortAlphabetically}
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.Alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={handleSortByLength}
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.ByLength,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleToggleReverse}
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {isChanged && (
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
        {sortedList.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
