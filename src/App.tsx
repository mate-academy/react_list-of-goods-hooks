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
  Alphabetical = 'alphabet',
  Length = 'length',
  All = '',
}

interface SortProps {
  sortGoods: SortType;
  reversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortGoods, reversed }: SortProps,
): string[] {
  const preparedGoods = [...goods];

  if (sortGoods) {
    preparedGoods.sort((good1, good2) => {
      switch (sortGoods) {
        case SortType.Alphabetical:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortGoods, setSortGoods] = useState(SortType.All);
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortGoods,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortGoods === SortType.Alphabetical ? '' : 'is-light'}`}
          onClick={() => setSortGoods(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortGoods === SortType.Length ? '' : 'is-light'}`}
          onClick={() => setSortGoods(SortType.Length)}
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

        {(sortGoods || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortGoods(SortType.All);
              setReversed(false);
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
