import classNames from 'classnames';
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

enum SortField {
  Name = 'name',
  Length = 'length',
  NoField = '',
}

type SortProps = {
  sortBy: SortField;
  reversed: boolean;
};

function getPreparedGoods(products: string[], { sortBy, reversed }: SortProps) {
  const copy = [...products];

  if (sortBy) {
    copy.sort((a, b) => {
      switch (sortBy) {
        case SortField.Name:
          return a.localeCompare(b);
        case SortField.Length:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    return copy.reverse();
  }

  return copy;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortField.NoField);
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

        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setSortBy(SortField.NoField);
            setReversed(false);
          }}
        >
          Reset
        </button>
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
