import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';


enum SortType {
  None = '',
  Alphabetical = 'alphabetical',
  Length = 'length',
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
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);


  const sortAlphabetically = (): void => {
    const sortedGoods = [...goodsFromServer].sort();

    setGoods(sortedGoods);
    setSortField(SortType.Alphabetical);
    setIsReversed(false);
  };

  const sortBylength = (): void => {
    const sortedGoods = [...goodsFromServer].sort(
      (a, b) => a.length - b.length,
    );

    setGoods(sortedGoods);
    setSortField(SortType.Length);
    setIsReversed(false);
  };

  const reversedGoods = (): void => {
    const reversdGoods = [...goods].reverse();

    setGoods(reversdGoods);
    setIsReversed(!isReversed);
  };

  const resetGoods = (): void => {
    setGoods(goodsFromServer);
    setSortField(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.Alphabetical ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortField === SortType.Length ? '' : 'is-light'}`}
          onClick={sortBylength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${isReversed ? '' : 'is-light'}`}
          onClick={reversedGoods}
        >
          Reverse
        </button>

        {goods.join('') !== goodsFromServer.join('') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
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
