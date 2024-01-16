import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { SortType } from './Types/SortType';
import { getPreparedGoods } from './Services/getPreparedGoods';

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
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortField, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SortType.SORT_FIELD_ALPHABET);
          }}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SortType.SORT_FIELD_ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SortType.SORT_FIELD_LENGTH);
          }}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SortType.SORT_FIELD_LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReverse(!reverse);
          }}
          type="button"
          className={`button is-warning  ${cn({
            'is-light': reverse === false,
          })}`}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            onClick={() => {
              setSortField('');
              setReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
