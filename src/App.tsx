/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
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
  Alphabetically = 'Alphabetically',
  Length = 'Length',
  None = 'None',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortGoods = (type: SortType, reverse: boolean): string[] => {
    const sortedGoods = [...goodsFromServer];

    if (type === SortType.Alphabetically) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (type === SortType.Length) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (reverse) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  useEffect(() => {
    const newGoods = sortGoods(sortType, isReversed);

    setGoods(newGoods);
    console.log('Goods updated:', newGoods); // Debugging line
  }, [sortType, isReversed]);

  const handleSortAlphabetically = () => {
    setSortType(SortType.Alphabetically);
  };

  const handleSortByLength = () => {
    setSortType(SortType.Length);
  };

  const toggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const resetGoods = () => {
    setSortType(SortType.None);
    setIsReversed(false);
    setGoods([...goodsFromServer]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabetically ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.Length ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.None || isReversed) && (
          <button
            type="button"
            className="button is-danger"
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
