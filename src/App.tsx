import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

type Props = {
  initialGoods: string[];
};

enum SortType {
  Alphabetical = 'Alphabetical',
  ByLength = 'ByLength',
  None = 'None',
}

export const App: React.FC<Props> = ({ initialGoods }) => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversedActive, setIsReversedActive] = useState(false);

  function getPreparedGoods(
    sortedGoods: string[],
    currentSortType: SortType,
    reversed: boolean,
  ) {
    const updatedGoods = [...sortedGoods];

    switch (currentSortType) {
      case SortType.Alphabetical:
        updatedGoods.sort((one, two) => one.localeCompare(two));
        break;
      case SortType.ByLength:
        updatedGoods.sort((one, two) => one.length - two.length);
        break;
    }

    if (reversed) {
      updatedGoods.reverse();
    }

    return updatedGoods;
  }

  const sortedGoods = getPreparedGoods(
    initialGoods,
    sortType,
    isReversedActive,
  );


  function reverseGoods() {
    setIsReversedActive(!isReversedActive);
  }

  function reset() {
    setSortType(SortType.None);
    setIsReversedActive(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.Alphabetical,
          })}
          onClick={() => {
            setSortType(SortType.Alphabetical);
            getPreparedGoods(
              initialGoods,
              SortType.Alphabetical,
              isReversedActive,
            );
          }}
          data-cy="sortAlphabeticallyButton"
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.ByLength,
          })}
          onClick={() => {
            setSortType(SortType.ByLength);
            getPreparedGoods(initialGoods, SortType.ByLength, isReversedActive);
          }}
          data-cy="sortByLengthButton"
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversedActive,
          })}
          onClick={reverseGoods}
          data-cy="reverseButton"
        >
          Reverse
        </button>

        {(sortType !== SortType.None || isReversedActive) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
            data-cy="resetButton"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map((good, index) => (
          <li key={index} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
