import React, { useState } from 'react';
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
  DEFAULT = '',
  ALPHABETICAL = 'alphabet',
  LENGTH = 'length',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const handleSortAlphabetically = (): void => setSortType(SortType.ALPHABETICAL);
  const handleSortByLength = (): void => setSortType(SortType.LENGTH);
  const handleReverse = (): void => setIsReversed(prev => !prev);
  const handleReset = (): void => {
    setSortType(SortType.DEFAULT);
    setIsReversed(false);
  };

  // обчислюємо список на льоту
  const displayedGoods: string[] = [...goodsFromServer];

  if (sortType === SortType.ALPHABETICAL) {
    displayedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortType === SortType.LENGTH) {
    displayedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    displayedGoods.reverse();
  }

  const isInitialOrder: boolean = sortType === SortType.DEFAULT && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABETICAL ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isInitialOrder && (
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
        {displayedGoods.map((good: string) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
