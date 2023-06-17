/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
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

enum EnumSortType {
  NONE,
  ALPHABET,
  LENGTH,
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [reverse, setReverse] = useState(false);
  const [sortType, setSortType] = useState(EnumSortType.NONE);

  const reverseList = () => {
    setGoods([...goods].reverse());
    setReverse(!reverse);
  };

  const sortByAlphabet = () => {
    setSortType(EnumSortType.ALPHABET);
    setGoods(prevGoods => prevGoods.sort((a, b) => a.localeCompare(b)));
  };

  const sortByLength = () => {
    setSortType(EnumSortType.LENGTH);
    setGoods(prevGoods => prevGoods.sort((a, b) => a.length - b.length));
  };

  const resetToDefault = () => {
    setSortType(EnumSortType.NONE);
    setGoods([...goodsFromServer]);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info
            ${sortType !== EnumSortType.ALPHABET && 'is-light'}`}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success
            ${sortType !== EnumSortType.LENGTH && 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning
            ${reverse ? '' : 'is-light'}`}
          onClick={reverseList}
        >
          Reverse
        </button>

        {(sortType !== EnumSortType.NONE || reverse)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetToDefault}
            >
              Reset
            </button>
          )}
      </div>
      <ul>
        <ul>
          {goods.map(name => <li data-cy="Good" key={name}>{name}</li>)}
        </ul>
      </ul>
    </div>
  );
};
