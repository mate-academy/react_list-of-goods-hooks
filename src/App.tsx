import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { goodsFromServer, SortType } from './types';

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortAlphabet = (arr: string[]) =>
    [...arr].sort((a, b) => a.localeCompare(b));
  const sortByLength = (arr: string[]) =>
    [...arr].sort((a, b) => a.length - b.length);

  const handleSortAlphabet = () => {
    let sorted = sortAlphabet([...goodsFromServer]);
    if (isReversed) sorted.reverse();
    setGoods(sorted);
    setSortType(SortType.Alphabetical);
  };

  const handleSortByLength = () => {
    let sorted = sortByLength([...goodsFromServer]);
    if (isReversed) sorted.reverse();
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
          data-cy="sortAlphabet"
          className={sortType === SortType.Alphabetical ? '' : 'is-light'}
          onClick={handleSortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          data-cy="sortByLength"
          className={sortType === SortType.Length ? '' : 'is-light'}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          data-cy="reverse"
          className={isReversed ? '' : 'is-light'}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.None || isReversed) && (
          <button
          type="button"
          data-cy="reset"
          onClick={handleReset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
