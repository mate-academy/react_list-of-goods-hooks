import React from 'react';
import cn from 'classnames';
import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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

type GoodProps = {
  good: string;
};

const Good: React.FC<GoodProps> = ({ good }) => <li data-cy="Good">{good}</li>;

enum SortType {
  Default = '',
  Alphabetically = 'abc',
  ByLength = 'length',
  Reverse = 'reverse',
}

const sortByCondition = (array: string[], sortField: SortType): string[] => {
  const newArray = [...array];

  if (sortField === SortType.Alphabetically) {
    return newArray.sort((a, b) => a.localeCompare(b));
  }

  if (sortField === SortType.ByLength) {
    return newArray.sort((a, b) => a.length - b.length);
  }

  return newArray;
};

export const App: React.FC = () => {
  const [action, setAction] = useState<SortType>(SortType.Default);
  const [direction, setDirection] = useState<SortType | ''>('');

  const sortedGoods = sortByCondition(goodsFromServer, action);

  const displayedGoods =
    direction === SortType.Reverse ? [...sortedGoods].reverse() : sortedGoods;

  const isResetVisible =
    displayedGoods.length !== goodsFromServer.length ||
    displayedGoods.some((v, i) => v !== goodsFromServer[i]);

  const changeDirection = () => {
    setDirection(prev => (prev === '' ? SortType.Reverse : ''));
  };

  const handleReset = () => {
    setAction(SortType.Default);
    setDirection('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': action !== SortType.Alphabetically,
          })}
          onClick={() => setAction(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': action !== SortType.ByLength,
          })}
          onClick={() => setAction(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': direction === '' })}
          onClick={changeDirection}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className={cn('button is-danger', {
              'is-light': !isResetVisible,
            })}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {displayedGoods.map(good => (
          <Good key={good} good={good} />
        ))}
      </ul>
    </div>
  );
};
