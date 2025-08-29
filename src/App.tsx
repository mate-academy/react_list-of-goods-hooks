import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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

export enum SortField {
  None = 'none',
  Alphabetical = 'alphabetical',
  Length = 'length',
}

export const App = () => {
  const [sortField, setSortField] = useState(SortField.None);
  const [reverse, setReverse] = useState(false);
  let visibleGoods = [...goodsFromServer];

  if (sortField === SortField.Alphabetical) {
    visibleGoods = visibleGoods.toSorted((a, b) => a.localeCompare(b));
  }

  if (sortField === SortField.Length) {
    visibleGoods = visibleGoods.toSorted((a, b) => a.length - b.length);
  }

  if (reverse) {
    visibleGoods = visibleGoods.toReversed();
  }

  const alphaLight = sortField !== SortField.Alphabetical ? 'is-light' : '';
  const lengthLight = sortField !== SortField.Length ? 'is-light' : '';
  const reverseLight = !reverse ? 'is-light' : '';
  const resetVisible = sortField !== SortField.None || reverse;

  const clearAll = () => {
    setSortField(SortField.None);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${alphaLight}`}
          onClick={() => setSortField(SortField.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${lengthLight}`}
          onClick={() => setSortField(SortField.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverseLight}`}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {resetVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => clearAll()}
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
