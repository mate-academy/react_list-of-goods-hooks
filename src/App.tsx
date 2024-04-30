import classNames from 'classnames';
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { getPreparedGoods } from './Filter/Filter';
import { SortField } from './Filter/type';

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
  const [sortBy, setSortBy] = useState(SortField.Default);
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortBy,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${classNames({ 'is-light': sortBy !== SortField.Name })}`}
          onClick={() => setSortBy(SortField.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${classNames({ 'is-light': sortBy !== SortField.Length })}`}
          onClick={() => setSortBy(SortField.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${classNames({ 'is-light': !reversed })}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortBy || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortField.Default);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(word => (
            <li data-cy="Good" key={word}>
              {word}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
