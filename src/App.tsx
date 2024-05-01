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

enum SortType {
  Default = '',
  Alphabet = 'goodAlphabet',
  Length = 'goodLength',
}

function getVisibleGoods(
  goods: string[],
  {
    sortField,
    reverse,
  }: {
    sortField: SortType;
    reverse: boolean;
  },
) {
  const visibleGoods = [...goods];

  if (sortField) {
    visibleGoods.sort((g1, g2) => {
      switch (sortField) {
        case SortType.Length:
          return g1.length - g2.length;
        case SortType.Alphabet:
          return g1.localeCompare(g2);
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.Default);
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getVisibleGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SortType.Alphabet && 'is-light'}`}
          onClick={() => {
            setSortField(SortType.Alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SortType.Length && 'is-light'}`}
          onClick={() => {
            setSortField(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverse || 'is-light'}`}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(reverse || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.Default);
              setReverse(false);
            }}
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
