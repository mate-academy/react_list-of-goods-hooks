import React, { useState } from 'react';
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
enum SortType {
  NONE = 'none',
  ALPHABETICALLY = 'alphabetically',
  BY_LENGTH = 'by_length',
}

export const App: React.FC = () => {
  const [currentSort, setCurrentSort] = useState<SortType>(SortType.NONE);
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [originalGoods] = useState<string[]>([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState(false);
  const isReset: boolean = currentSort !== SortType.NONE || isReversed;
  const handleReset = () => {
    setCurrentSort(SortType.NONE);
    setIsReversed(false);
    setGoods(originalGoods);
  };

  const sortGoods = (sortType: SortType, reverse: boolean) => {
    const sortedGoods = [...originalGoods];

    if (sortType === SortType.ALPHABETICALLY) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortType === SortType.BY_LENGTH) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (reverse) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
  };

  const handleReverse = (): void => {
    const newReversed = !isReversed;

    setIsReversed(newReversed);
    sortGoods(currentSort, newReversed);
  };

  const handleLength = () => {
    setCurrentSort(SortType.BY_LENGTH);
    sortGoods(SortType.BY_LENGTH, isReversed);
  };

  const handleAlphabetically = () => {
    setCurrentSort(SortType.ALPHABETICALLY);
    sortGoods(SortType.ALPHABETICALLY, isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${currentSort === SortType.ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={handleAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${currentSort === SortType.BY_LENGTH ? '' : 'is-light'}`}
          onClick={handleLength}
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
        {isReset && (
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
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
