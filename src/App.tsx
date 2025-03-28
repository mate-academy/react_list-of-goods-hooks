/* eslint-disable no-console */

import React, { useState } from 'react';
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
  None = 'none',
  Alphabetically = 'alphabetically',
  Lenght = 'lenght',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [sortedList, setSortedList] = useState<string[]>([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState(false);

  const isInitialOrder = sortedList.every(
    (item, index) => item === goodsFromServer[index],
  );

  const handleSortedList = (type: SortType) => {
    setSortType(type);

    const source =
      sortType === SortType.None ? [...goodsFromServer] : [...sortedList];

    const sorted = [...source];

    if (type === SortType.Alphabetically) {
      sorted.sort((a, b) => a.localeCompare(b));
    } else if (type === SortType.Lenght) {
      sorted.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sorted.reverse();
    }

    setSortedList(sorted);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
    setSortedList(prev => [...prev].reverse());
  };

  const handleReset = () => {
    setSortedList([...goodsFromServer]);
    setSortType(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.Alphabetically,
          })}
          onClick={() => handleSortedList(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.Lenght,
          })}
          onClick={() => handleSortedList(SortType.Lenght)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isInitialOrder && (
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
        {sortedList.map((g: string) => (
          <li key={g} data-cy="Good">
            {g}
          </li>
        ))}
      </ul>
    </div>
  );
};
