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
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType;
  isReversed: boolean;
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.LENGTH:
        return good1.length - good2.length;
      case SortType.ALPHABET:
        return good1.localeCompare(good2);
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [state, setState] = useState({
    isReversed: false,
    sortType: SortType.NONE,
  });
  const resetButton = state.sortType !== SortType.NONE || state.isReversed;
  const recordedGoods = getReorderedGoods(goodsFromServer, state);

  const handleReverseButton = () => {
    setState({
      ...state,
      isReversed: !state.isReversed,
    });
  };

  const handleResetButton = () => {
    setState({
      isReversed: false,
      sortType: SortType.NONE,
    });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setState({ ...state, sortType: SortType.ALPHABET })}
          className={cn('button is-info', {
            'is-light': state.sortType !== SortType.ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setState({ ...state, sortType: SortType.LENGTH })}
          className={cn('button is-success', {
            'is-light': state.sortType !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !state.isReversed,
          })}
          onClick={handleReverseButton}
        >
          Reverse
        </button>

        {resetButton && (
          <button
            type="button"
            onClick={handleResetButton}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {recordedGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
