import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import cn from 'classnames';

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

enum SortType {
  ALPHABETICALLY = 'Sort alphabetically',
  BY_LENGTH = 'Sort by length',
  REVERSE = 'Reverse',
  DEFAULT = '',
}

const sortGoods = (goods: string[], sortField: SortType, reversed: boolean) => {
  let sortedGoods = [...goods];

  if (sortField) {
    sortedGoods.sort((good1, good2) => {
      const { ALPHABETICALLY, BY_LENGTH } = SortType;

      switch (sortField) {
        case ALPHABETICALLY:
          return good1.localeCompare(good2);
        case BY_LENGTH:
          return good1.length - good2.length || good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    sortedGoods = sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const { ALPHABETICALLY, BY_LENGTH, REVERSE, DEFAULT } = SortType;
  const [sortField, setSortField] = useState(DEFAULT);
  const [reversed, setReversed] = useState(false);
  const sortedGoods = sortGoods(goodsFromServer, sortField, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${cn({
            'is-light': sortField !== ALPHABETICALLY,
          })}`}
          onClick={() => setSortField(ALPHABETICALLY)}
        >
          {ALPHABETICALLY}
        </button>

        <button
          type="button"
          className={`button is-success ${cn({
            'is-light': sortField !== BY_LENGTH,
          })}`}
          onClick={() => setSortField(BY_LENGTH)}
        >
          {BY_LENGTH}
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({
            'is-light': !reversed,
          })}`}
          onClick={() => setReversed(!reversed)}
        >
          {REVERSE}
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(DEFAULT);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
