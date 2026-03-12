import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

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
  None = '',
  Alphabetical = 'alphabetical',
  Length = 'length',
}

export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState<string[]>(goodsFromServer);
  const [activeSort, setActiveSort] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortByAlphabetically = (): void => {
    const sortedList = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    if (isReversed) {
      sortedList.reverse();
    }

    setVisibleGoods(sortedList);
    setActiveSort(SortType.Alphabetical);
  };

  const sortByLength = (): void => {
    const sortedLength = [...goodsFromServer].sort(
      (a, b) => a.length - b.length,
    );

    if (isReversed) {
      sortedLength.reverse();
    }

    setVisibleGoods(sortedLength);
    setActiveSort(SortType.Length);
  };

  const toggleReverse = (): void => {
    const newReversedState = !isReversed;

    setIsReversed(newReversedState);

    const reversedList = [...visibleGoods].reverse();

    setVisibleGoods(reversedList);
  };

  const handleReset = (): void => {
    setVisibleGoods(goodsFromServer);
    setActiveSort(SortType.None);
    setIsReversed(false);
  };

  const isResetVisible: boolean = activeSort !== SortType.None || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeSort !== SortType.Alphabetical ? 'is-light' : ''}`}
          onClick={sortByAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeSort !== SortType.Length ? 'is-light' : ''}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {isResetVisible && (
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
        {visibleGoods.map(goods => (
          <li key={goods} data-cy="Good">
            {goods}
          </li>
        ))}
      </ul>
    </div>
  );
};
