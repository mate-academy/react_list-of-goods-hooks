import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortList } from './components/SortList';
import { getSortedGoods } from './components/getSorted';

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

export enum SortType {
  'none' = '',
  'alphabetically' = 'Sort alphabetically',
  'length' = 'Sort by length',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.none);
  const [reverseField, setReverseField] = useState<boolean>(false);
  const initialGoods = [...goodsFromServer];
  const visibleGoods = getSortedGoods(initialGoods, sortField, reverseField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.alphabetically ? SortType.none : 'is-light'}`}
          onClick={() => {
            setSortField(SortType.alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortType.length ? SortType.none : 'is-light'}`}
          onClick={() => {
            setSortField(SortType.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverseField ? '' : 'is-light'}`}
          onClick={() => {
            setReverseField(!reverseField);
          }}
        >
          Reverse
        </button>

        {sortField || reverseField ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.none);
              setReverseField(false);
            }}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <SortList list={visibleGoods} />
    </div>
  );
};
