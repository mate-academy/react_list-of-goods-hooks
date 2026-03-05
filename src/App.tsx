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
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [sortType, setSortType] = useState<SortType | null>(null);

  const getButtonClass = (type: SortType) => {
    return `button is-light ${sortType === type ? 'is-active' : ''}`;
  };

  const isModified = goods.join() !== goodsFromServer.join();

  const sortAlphabetically = () => {
    const sorted = [...goods].sort((a, b) => a.localeCompare(b));

    setGoods(sorted);
    setSortType(SortType.Alphabet);
  };

  const sortByLength = () => {
    const sorted = [...goods].sort((a, b) => a.length - b.length);

    setGoods(sorted);
    setSortType(SortType.Length);
  };

  const reverseGoods = () => {
    setGoods([...goods].reverse());
    setSortType(null);
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setSortType(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={getButtonClass(SortType.Alphabet)}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={getButtonClass(SortType.Length)}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {isModified && (
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
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
