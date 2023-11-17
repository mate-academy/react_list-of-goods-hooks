import React, { useState } from 'react';
import cn from 'classnames';
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

export enum SortOptions {
  Alphabetically = 'alphabetically',
  Length = 'length',
  Reset = 'reset',
}

const handleSort
  = (goods: string[],
    options: { activeSort: SortOptions; isReversed: boolean }) => {
    const preparedGoods = [...goods];

    preparedGoods.sort((a, b) => {
      switch (options.activeSort) {
        case SortOptions.Alphabetically:
          return a.localeCompare(b);

        case SortOptions.Length:
          return a.length - b.length;

        default:
          return 0;
      }
    });

    if (options.isReversed) {
      preparedGoods.reverse();
    }

    return preparedGoods;
  };

export const App: React.FC = () => {
  const [activeSort, setActiveSort]
    = useState('');

  const [isReversed, setIsReversed]
    = useState(false);

  const visibleGoods = handleSort(goodsFromServer, {
    activeSort: activeSort || SortOptions.Alphabetically,
    isReversed,
  } as { activeSort: SortOptions; isReversed: boolean });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': activeSort !== 'alphabetically' })}
          onClick={() => setActiveSort('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': activeSort !== 'length' })}
          onClick={() => setActiveSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(activeSort || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setActiveSort('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
