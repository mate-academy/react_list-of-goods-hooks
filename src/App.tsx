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
  NONE,
  ALPHABETICALLY,
  BY_LENGTH,
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const [isOriginalOrder, setIsOriginalOrder] = useState(true);

  const sortAlphabetically = () => {
    const sortedGoods = [...goods].sort();

    setGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
    setSortType(SortType.ALPHABETICALLY);
    setIsOriginalOrder(false);
  };

  const sortByLength = () => {
    const sortedGoods = [...goods].sort((a, b) => {
      return isReversed ? a.length - b.length : b.length - a.length;
    });

    setGoods(sortedGoods);
    setSortType(SortType.BY_LENGTH);
    setIsOriginalOrder(false);
  };

  const reverseGoods = () => {
    setGoods(currentGoods => [...currentGoods].reverse());
    setIsReversed(currentIsReversed => !currentIsReversed);
    setIsOriginalOrder(isReversed && sortType === SortType.NONE);
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setSortType(SortType.NONE);
    setIsReversed(false);
    setIsOriginalOrder(true);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === SortType.ALPHABETICALLY ? '' : 'is-light'
          }`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === SortType.BY_LENGTH ? '' : 'is-light'
          }`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
