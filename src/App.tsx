/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

enum SortType {
  Alphabetically = 'alphabetically',
  Length = 'length',
  Default = '',
}

const initialGoods: string[] = [
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
  const [goods, setGoods] = useState<string[]>(initialGoods);
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [ascending, setAscending] = useState<boolean>(true);

  const sortGoods = (items: string[], type: SortType, isReversed: boolean): string[] => {
    const sortedItems = [...items];

    if (type === SortType.Alphabetically) {
      sortedItems.sort((a, b) => b.localeCompare(a));
    } else if (type === SortType.Length) {
      sortedItems.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedItems.reverse();
    }

    return sortedItems;
  };

  const handleSort = (type: SortType) => {
    const sortedGoods = sortGoods([...goods], type, ascending);

    setGoods(sortedGoods);
    setSortType(type);
    setAscending(true);
  };

  const handleReverse = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setAscending(!ascending);
  };

  const handleReset = () => {
    setGoods(initialGoods);
    setSortType(SortType.Default);
    setAscending(true);
  };

  const isResetVisible = sortType !== SortType.Default || !ascending;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SortType.Alphabetically,
          })}
          onClick={() => handleSort(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={() => handleSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': ascending,
          })}
          onClick={handleReverse}
        >
          Реверс
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
