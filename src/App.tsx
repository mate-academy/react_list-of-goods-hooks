import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export type Good = string;

export const goodsFromServer: Good[] = [
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
  alph,
  len,
  orig,
}

function sort(list: Good[], sortedBy: SortType, isReversed = false): Good[] {
  let sorted: Good[];

  switch (sortedBy) {
    case SortType.alph:
      sorted = list.toSorted((it, other) => it.localeCompare(other));
      break;
    case SortType.len:
      sorted = list.toSorted((it, other) => it.length - other.length);
      break;
    default:
      sorted = [...list];
  }

  return isReversed ? sorted.reverse() : sorted;
}

export const App: React.FC = () => {
  const [sortedBy, setSortedBy] = useState(SortType.orig);
  const [reversed, setReversed] = useState(false);

  const sortedGoods: Good[] = sort(goodsFromServer, sortedBy, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortedBy !== SortType.alph && 'is-light'}`}
          onClick={() => setSortedBy(SortType.alph)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortedBy !== SortType.len && 'is-light'}`}
          onClick={() => setSortedBy(SortType.len)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reversed && 'is-light'}`}
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortedBy !== SortType.orig || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReversed(false);
              setSortedBy(SortType.orig);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
