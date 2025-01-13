import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { SortType } from './types/SortType';

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
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const handleSort = (type: SortType): void => {
    let sortedGoods = [...goods];

    if (type === SortType.Alphabetically) {
      sortedGoods.sort();
    } else if (type === SortType.Length) {
      sortedGoods.sort((a, b) => {
        if (a.length === b.length) {
          return goodsFromServer.indexOf(a) - goodsFromServer.indexOf(b);
        }
        return a.length - b.length;
      });
    }

    setGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
    setSortType(type);
  };

  const handleReverse = (): void => {
    setGoods([...goods].reverse());
    setIsReversed((prev) => !prev);
  };

  const handleReset = (): void => {
    setGoods([...goodsFromServer]);
    setSortType(SortType.None);
    setIsReversed(false);
  };

  const isOnStart = JSON.stringify(goodsFromServer) === JSON.stringify(goods);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabetically ? '' : 'is-light'}`}
          onClick={() => handleSort(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.Length ? '' : 'is-light'}`}
          onClick={() => handleSort(SortType.Length)}
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

        {!isOnStart && (
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
