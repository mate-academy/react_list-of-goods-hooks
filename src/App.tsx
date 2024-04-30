import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';
import { getPreparedGoods } from './utils/getPreparedGoods';
import { SortTypes } from './types/SortTypes';

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
  const [sortField, setSortField] = useState(SortTypes.DEFAULT);
  const [reverseMethod, setReverseMethod] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    reverseMethod,
  );

  const resetSort = () => {
    setSortField(SortTypes.DEFAULT);
    setReverseMethod(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortTypes.ALPHABETICALLY,
          })}
          onClick={() => {
            setSortField(SortTypes.ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortTypes.LENGTH,
          })}
          onClick={() => {
            setSortField(SortTypes.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverseMethod,
          })}
          onClick={() => {
            setReverseMethod(!reverseMethod);
          }}
        >
          Reverse
        </button>

        {(reverseMethod || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSort}
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
