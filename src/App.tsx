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
  Default = 'default',
  Alphabetical = 'alphabetical',
  ByLength = 'byLength',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const applySortAndReverse = (
    list: string[],
    type: SortType,
    reversed: boolean,
  ): string[] => {
    const sortedGoods = [...list];

    if (type === SortType.Alphabetical) {
      sortedGoods.sort();
    } else if (type === SortType.ByLength) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    return reversed ? sortedGoods.reverse() : sortedGoods;
  };

  const handleSort = (type: SortType): void => {
    setSortType(type);
    const sortedGoods = applySortAndReverse(goodsFromServer, type, isReversed);

    setGoods(sortedGoods);
  };

  const handleReverse = (): void => {
    setIsReversed(prevReversed => {
      const newReversed = !prevReversed;
      const reversedGoods = applySortAndReverse(
        goodsFromServer,
        sortType,
        newReversed,
      );

      setGoods(reversedGoods);

      return newReversed;
    });
  };

  const handleReset = (): void => {
    setGoods([...goodsFromServer]);
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  const isDefaultOrder = sortType === SortType.Default && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabetical ? '' : 'is-light'}`}
          onClick={() => handleSort(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.ByLength ? '' : 'is-light'}`}
          onClick={() => handleSort(SortType.ByLength)}
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

        {!isDefaultOrder && (
          <button
            type="button"
            className="button is-danger"
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
