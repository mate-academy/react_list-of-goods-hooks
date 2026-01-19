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

// type SortField = 'name' | 'length' | null;

enum SortType {
  name = 'name',
  length = 'length',
  null,
}

function getPreparedGoods(
  goods: string[],
  { sortField }: { sortField: SortType },
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case 'name':
          return a.localeCompare(b);

        case 'length':
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(null);
  const [reversed, setReversed] = useState(false);
  let visableGoods: string[] = getPreparedGoods(goodsFromServer, { sortField });

  if (reversed) {
    visableGoods = visableGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === 'name' ? '' : 'is-light'}`}
          onClick={() => setSortField('name')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === 'length' ? '' : 'is-light'}`}
          onClick={() => setSortField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {JSON.stringify(visableGoods) !== JSON.stringify(goodsFromServer) ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(null);
              setReversed(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>
      <ul>
        {visableGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
