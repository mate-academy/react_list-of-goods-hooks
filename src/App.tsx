import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { goodsFromServer, SortType } from './types';
import { GoodItem } from './GoodItem';
export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortAlphabet = (arr: string[]) =>
    [...arr].sort((a, b) => a.localeCompare(b));
  const sortByLength = (arr: string[]) =>
    [...arr].sort((a, b) => a.length - b.length);

  const handleSortAlphabet = () => {
    const sorted = sortAlphabet([...goodsFromServer]);

    if (isReversed) {
      sorted.reverse();
    }

    setGoods(sorted);
    setSortType(SortType.Alphabetical);
  };

  const handleSortByLength = () => {
    const sorted = sortByLength([...goodsFromServer]);

    if (isReversed) {
      sorted.reverse();
    }

    setGoods(sorted);
    setSortType(SortType.Length);
  };

  const handleReverse = () => {
    setGoods(prev => [...prev].reverse());
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setSortType(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabetical ? 'is-active' : 'is-light'}`}
          onClick={handleSortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.Length ? 'is-active' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? 'is-active' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.None || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <GoodItem good={item} key={item} />
        ))}
      </ul>
    </div>
  );
};
