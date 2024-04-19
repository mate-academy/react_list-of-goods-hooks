import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import { goodsFromServer } from './data';
import { sortGoods } from './helpers/sortGoods';

import { Good } from './types/Goods';
import { SortType } from './types/SortMethods';

import './App.scss';

export const App: React.FC = () => {
  const [filter, setFilter] = useState(SortType.All);
  const [reverse, setReverse] = useState(false);

  const goods: Good[] = sortGoods(goodsFromServer, filter, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${filter !== SortType.Alpha && 'is-light'}`}
          onClick={() => {
            setFilter(SortType.Alpha);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${filter !== SortType.Length && 'is-light'}`}
          onClick={() => {
            setFilter(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reverse && 'is-light'}`}
          onClick={() => {
            setReverse(!reverse);
          }}
        >
          Reverse
        </button>

        {(filter !== SortType.All || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setFilter(SortType.All);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li data-cy="Good" key={good.id}>
              {good.name}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
