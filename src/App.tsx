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
  Alphabetically = 'Alphabetically',
  ByLength = 'ByLength',
  Start = '',
}

function sortByGoods(goods: string[], sortFild: SortType) {
  const visibleGood = [...goods];

  if (sortFild) {
    visibleGood.sort((good1, good2) => {
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

  return visibleGood;
}

export const App: React.FC = () => {
  const [sortFild, setSortFild] = useState<SortType>(SortType.Start);
  let sortGoods = sortByGoods(goodsFromServer, sortFild);
  const [reversed, setReversed] = useState(false);

  if (reversed) {
    sortGoods = sortGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortFild === SortType.Alphabetically ? '' : 'is-light'}`}
          onClick={() => {
            setSortFild(SortType.Alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortFild === SortType.ByLength ? '' : 'is-light'}`}
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

        {(sortFild || reversed) && (
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
