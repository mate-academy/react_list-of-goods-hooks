import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { ActionsState } from './types/sort';

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
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [actions, setActions] = useState<ActionsState>({
    sort: null,
    reversed: false,
  });

  const SortA = () => {
    const sorted = [...goodsFromServer].sort((good1, good2) => {
      return good1.localeCompare(good2);
    });

    setVisibleGoods(actions.reversed ? sorted.reverse() : sorted);
    setActions({ sort: 'alphabetical', reversed: actions.reversed });
  };

  const SortByLength = () => {
    const sorted = [...goodsFromServer].sort((good1, good2) => {
      const lengthComparison = good1.length - good2.length;

      if (lengthComparison === 0) {
        return good1.localeCompare(good2);
      }

      return lengthComparison;
    });

    setVisibleGoods(actions.reversed ? sorted.reverse() : sorted);
    setActions({ sort: 'length', reversed: actions.reversed });
  };

  const Reverse = () => {
    const reversed = [...visibleGoods].reverse();

    setVisibleGoods(reversed);
    setActions({ sort: actions.sort, reversed: !actions.reversed });
  };

  const Reset = () => {
    setVisibleGoods(goodsFromServer);
    setActions({ sort: null, reversed: false });
  };

  const showReset = actions.sort !== null || actions.reversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': actions.sort !== 'alphabetical',
          })}
          onClick={SortA}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': actions.sort !== 'length',
          })}
          onClick={SortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !actions.reversed })}
          onClick={Reverse}
        >
          Reverse
        </button>

        {showReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={Reset}
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
