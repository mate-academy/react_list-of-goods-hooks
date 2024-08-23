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

type SortType = 'length' | 'abc' | '';

const getSortedGoods = (sortType: SortType, reversed: boolean): string[] => {
  let sortedGoods = [...goodsFromServer];

  if (sortType) {
    sortedGoods.sort((a, b) => {
      switch (sortType) {
        case 'abc':
          return a.localeCompare(b);
        case 'length':
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    sortedGoods = sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>('');
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
    setSortType('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => handleSort('abc')}
          className={cn('button', 'is-info', {
            'is-light': sortType !== 'abc',
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => handleSort('length')}
          className={cn('button', 'is-success', {
            'is-light': sortType !== 'length',
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
        {(sortType || reversed) && (
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
