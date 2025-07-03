import React from 'react';
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

enum SortType {
  none,
  abc,
  length,
}

function sortGoods(goods: string[], sorting: SortType): string[] {
  const preparedGoods = [...goods];

  if (sorting === SortType.abc) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sorting === SortType.length) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [selectedSortType, setSortType] = useState<SortType>(SortType.none);
  const [reversed, setReversed] = useState(false);
  let visibaleGoods = sortGoods(goodsFromServer, selectedSortType);

  if (reversed) {
    visibaleGoods = [...visibaleGoods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${selectedSortType === SortType.abc ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.abc)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${selectedSortType === SortType.length ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {selectedSortType === SortType.none && reversed === false ? null : (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.none);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibaleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
