import React, { useState, useMemo } from 'react';
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
  Initial = 'initial',
  Alpha = 'alpha',
  Length = 'length',
}

const sortGoods = (goods: string[], type: SortType): string[] => {
  const goodsCopy = [...goods];

  switch (type) {
    case SortType.Alpha:
      return goodsCopy.sort((a, b) => a.localeCompare(b));

    case SortType.Length:
      return goodsCopy.sort((a, b) => a.length - b.length);

    default:
      return goodsCopy;
  }
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Initial);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortedGoods = useMemo(() => {
    let currentGoods = goodsFromServer;

    if (sortType !== SortType.Initial) {
      currentGoods = sortGoods(goodsFromServer, sortType);
    }

    if (isReversed) {
      return [...currentGoods].reverse();
    }

    return currentGoods;
  }, [sortType, isReversed]);

  const isOriginalOrder = sortType === SortType.Initial && !isReversed;

  const handleSortAlphabetically = () => setSortType(SortType.Alpha);
  const handleSortByLength = () => setSortType(SortType.Length);
  const handleReverse = () => setIsReversed(prev => !prev);
  const handleReset = () => {
    setSortType(SortType.Initial);
    setIsReversed(false);
  };

  return (
    <main className="section content">
      <h1 className="title">Goods sorting</h1>

      <div className="buttons">
        <button
          type="button"
          className={`button ${
            sortType === SortType.Alpha ? 'is-info' : 'is-light'
          }`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button ${
            sortType === SortType.Length ? 'is-success' : 'is-light'
          }`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button ${isReversed ? 'is-warning' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
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
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </main>
  );
};
