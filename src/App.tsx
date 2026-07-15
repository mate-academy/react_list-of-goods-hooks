import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

enum SortType {
  NONE = 'none',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  REVERSE = 'reverse',
}

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

export const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState(SortType.NONE);

  const sortGoodsAlphabetically = () => {
    setGoods(prev => [...prev].sort((a, b) => a.localeCompare(b)));
    setSortType(SortType.ALPHABET);
  };

  const sortGoodsByLength = () => {
    setGoods(prev => [...prev].sort((a, b) => a.length - b.length));
    setSortType(SortType.LENGTH);
  };

  const reverseGoods = () => {
    setGoods(prev => [...prev].reverse());
    setSortType(SortType.REVERSE);
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === SortType.ALPHABET ? '' : 'is-light'
          }`}
          onClick={sortGoodsAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === SortType.LENGTH ? '' : 'is-light'
          }`}
          onClick={sortGoodsByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${
            sortType === SortType.REVERSE ? '' : 'is-light'
          }`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {sortType !== SortType.NONE && (
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
