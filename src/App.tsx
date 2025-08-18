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
  Start = '',
  Alphabetically = 'alphabetically',
  ByLength = 'byLength',
}

function sortedGoods(goods: string[], sortFild: SortType) {
  const visibleGoods = [...goods];

  if (sortFild) {
    visibleGoods.sort((good1, good2) => {
      switch (sortFild) {
        case SortType.Alphabetically:
          return good1.localeCompare(good2);

        case SortType.ByLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortFilde, setSortFild] = useState<SortType>(SortType.Start);
  let sortGoods = sortedGoods(goodsFromServer, sortFilde);
  const [reversed, setReversed] = useState(false);

  if (reversed) {
    sortGoods = sortGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortFilde === SortType.Alphabetically ? '' : 'is-light'}`}
          onClick={() => {
            setSortFild(SortType.Alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortFilde === SortType.ByLength ? '' : 'is-light'}`}
          onClick={() => {
            setSortFild(SortType.ByLength);
          }}
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

        {(sortFilde || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortFild(SortType.Start);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortGoods.map(goods => (
          <li data-cy="Good" key={goods}>
            {goods}
          </li>
        ))}
      </ul>
    </div>
  );
};
