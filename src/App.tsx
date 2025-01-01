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
  Length = 'length',
  Alph = 'alph',
}

function getPreparedGoods(
  goods: string[],
  { sortField }: { sortField: SortType | '' },
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Length:
          return good1.length - good2.length;
        case SortType.Alph:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [reversed, setReversed] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, { sortField });

  if (reversed) {
    visibleGoods.reverse();
  }

  const isInitialOrder =
    !sortField && !reversed && visibleGoods.join() === goodsFromServer.join();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SortType.Alph
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField(SortType.Alph)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SortType.Length
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reversed ? 'button is-success' : 'button is-success is-light'
          }
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(n => (
          <li key={n} data-cy="Good">
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
};
