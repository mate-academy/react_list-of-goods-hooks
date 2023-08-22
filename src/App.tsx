import 'bulma/css/.css';
import './App.scss';
import React, { useState } from 'react';

const goodsFromServer = [
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

interface State {
  sortedGoods: string[];
  showResetButton: boolean;
  sortByAlphabeticallyActive?: boolean;
  sortByLengthActive?: boolean;
  reverseActive?: boolean;
}

export const App: React.FC = () => {
  const initialState: State = {
    sortedGoods: [...goodsFromServer],
    showResetButton: false,
  };

  const [state, setState] = useState<State>(initialState);

  const {
    sortedGoods,
    showResetButton,
    sortByAlphabeticallyActive,
    sortByLengthActive,
    reverseActive,
  } = state;

  const setActiveState = (activeSort: string) => ({
    sortByAlphabeticallyActive: activeSort === 'alphabetical',
    sortByLengthActive: activeSort === 'length',
    reverseActive: activeSort === 'reverse',
  });

  const updateState = (updatedState: Partial<State>) => {
    setState(prevState => ({
      ...prevState,
      ...updatedState,
    }));
  };

  const sortArray = (sortFunction: (a: string, b: string)
  => number, activeSort: string) => {
    const sortedArray = [...sortedGoods].sort(sortFunction);

    updateState({
      sortedGoods: sortedArray,
      showResetButton: true,
      ...setActiveState(activeSort),
    });
  };

  const reverseArray = () => {
    const reversedArray = [...sortedGoods].reverse();

    updateState({
      sortedGoods: reversedArray,
      reverseActive: !reverseActive,
    });
  };

  const resetArray = () => {
    setState(initialState);
  };

  const sortAlphabetically = () => {
    sortArray((a, b) => a.localeCompare(b), 'alphabetical');
  };

  const sortByLength = () => {
    sortArray((a, b) => a.length - b.length, 'length');
  };

  const handleReverse = () => {
    if (reverseActive) {
      resetArray();
    } else {
      reverseArray();
    }
  };

  const generateButtonClass = (isActive: boolean) => `button ${isActive ? '' : 'is-light'}`;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`${generateButtonClass(!!sortByAlphabeticallyActive)} is-info`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`${generateButtonClass(!!sortByLengthActive)} is-success`}
          onClick={sortByLength}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`${generateButtonClass(!!reverseActive)} is-warning`}
          onClick={handleReverse}
        >
          Reverse
        </button>
        {showResetButton && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetArray}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {sortedGoods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
