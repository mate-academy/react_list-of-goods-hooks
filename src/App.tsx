import React, { useEffect, useState } from 'react';
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

enum SortTypes {
  alphabetically = 'alphabetically',
  length = 'length',
}

export const App: React.FC = () => {
  const [goodsOrdered, setGoodsOrdered] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState<SortTypes | null>(null);

  useEffect(() => {
    const sortedGoods = [...goodsFromServer];

    if (sortType === SortTypes.alphabetically) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortType === SortTypes.length) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    setGoodsOrdered(sortedGoods);
  }, [sortType, isReversed]);

  const sortAlphabetically = () => {
    setSortType(SortTypes.alphabetically);
  };

  const sortByLength = () => {
    setSortType(SortTypes.length);
  };

  const reverseArray = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setSortType(null);
    setIsReversed(false);
    setGoodsOrdered(goodsFromServer);
  };

  const arraysAreEqual = (arr1: string[], arr2: string[]) => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    return arr1.every((item, index) => item === arr2[index]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortType === SortTypes.alphabetically
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortType === SortTypes.length
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed ? 'button is-success' : 'button is-success is-light'
          }
          onClick={reverseArray}
        >
          Reverse
        </button>

        {!arraysAreEqual(goodsOrdered, goodsFromServer) ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {goodsOrdered.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
