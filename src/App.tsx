import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

enum SortType {
  DEFAULT = '',
  ALPHABETICALLY = 'alphabetically',
  LENGTH = 'length',
}

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

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortType>(SortType.DEFAULT);

  const handleSortAlphabetically = (): void => {
    const sortedGoods: string[] = [...goodsFromServer].sort((a, b) =>
      a.localeCompare(b),
    );

    setGoods(isReversed ? [...sortedGoods].reverse() : sortedGoods);
    setSortBy(SortType.ALPHABETICALLY);
  };

  const handleSortByLength = (): void => {
    const sortedGoods: string[] = [...goodsFromServer].sort(
      (a, b) => a.length - b.length,
    );

    setGoods(isReversed ? [...sortedGoods].reverse() : sortedGoods);
    setSortBy(SortType.LENGTH);
  };

  const handleReverse = (): void => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  };

  const handleReset = (): void => {
    setGoods([...goodsFromServer]);
    setSortBy(SortType.DEFAULT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortBy === SortType.ALPHABETICALLY ? '' : 'is-light'
          }`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortBy === SortType.LENGTH ? '' : 'is-light'
          }`}
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

        {goods.join() !== goodsFromServer.join() && (
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
        {goods.map((good: string) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
