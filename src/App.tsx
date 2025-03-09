import React from 'react';
import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import ItemList from './Components/ItemList';

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

type SortType = null | 'alphabetically' | 'length';

export const App: React.FC = () => {
  // Hooks
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [isReverse, setIsReverse] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType>(null);

  // Handlers
  const handleSortAlphabetically = () => {
    setSortType('alphabetically');
    setIsReverse(false);
    setGoods([...goods].sort());
  };

  const handleSortByLength = () => {
    setSortType('length');
    setIsReverse(false);
    setGoods([...goodsFromServer].sort((a, b) => a.length - b.length));
  };

  const handleReverse = () => {
    setGoods(prevGoods => prevGoods.reverse());
    setIsReverse(prevIsReverse => !prevIsReverse);
  };

  const handleReset = () => {
    setGoods(goodsFromServer);
    setIsReverse(false);
    setSortType(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortType === 'alphabetically'
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortType === 'length'
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReverse === true
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={handleReverse}
        >
          Reverse
        </button>

        {sortType !== null || isReverse ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ItemList listOfItems={goods} />
    </div>
  );
};
