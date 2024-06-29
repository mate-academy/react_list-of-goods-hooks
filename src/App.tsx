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

function getPreparedGoods(
  sortedGoods: string[],
  currentSortType: SortType,
  reversed: boolean,
): string[] {
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

export const App: React.FC<Props> = ({ initialGoods }) => {
  const [goods, setGoods] = useState(initialGoods);
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversedActive, setIsReversedActive] = useState(false);

  function sortGoods(type: SortType) {
    const sorted = getPreparedGoods(goods, type, false);

    setGoods(sorted);
    setSortType(type);
    setIsReversedActive(false);
  }

  function reverseGoods() {
    const reversed = [...goods].reverse();

    setGoods(reversed);
    setIsReversedActive(!isReversedActive);
  }

  function reset() {
    setGoods([...initialGoods]);
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
          onClick={() => sortGoods(SortType.Alphabetical)}
          data-cy="sortAlphabeticallyButton"
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.ByLength,
          })}
          onClick={() => sortGoods(SortType.ByLength)}
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
        {goods.map((good, index) => (
          <li key={index} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
