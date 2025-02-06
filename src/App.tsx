// import React from 'react';
import React, { useState } from 'react';
import classNames from 'classnames';
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
  NONE,
  ALPHABET,
  LENGTH,
}

export interface SortingState {
  isReversed: boolean;
  sortType: SortType;
}

export const App: React.FC = () => {
  const [state, setState] = useState<SortingState>({
    isReversed: false,
    sortType: SortType.NONE,
  });

  const getSortedGoods = (): string[] => {
    const sortedGoods = [...goodsFromServer];

    if (state.sortType === SortType.ALPHABET) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (state.sortType === SortType.LENGTH) {
      sortedGoods.sort((a, b) => {
        if (a.length === b.length) {
          return goodsFromServer.indexOf(a) - goodsFromServer.indexOf(b);
        }

        return a.length - b.length;
      });
    }

    return state.isReversed ? sortedGoods.reverse() : sortedGoods;
  };

  const handleSort = (sortType: SortType) => {
    setState(prev => ({
      ...prev,
      sortType,
    }));
  };

  const handleReverse = () => {
    setState(prev => ({ ...prev, isReversed: !prev.isReversed }));
  };

  const handleReset = () => {
    setState({ isReversed: false, sortType: SortType.NONE });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': state.sortType !== SortType.ALPHABET,
          })}
          onClick={() => handleSort(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': state.sortType !== SortType.LENGTH,
          })}
          onClick={() => handleSort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !state.isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(state.sortType !== SortType.NONE || state.isReversed) && (
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
        {getSortedGoods().map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
