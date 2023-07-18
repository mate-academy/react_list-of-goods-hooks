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

enum SortFields {
  DEFAULT = '',
  ALPHABETICLY = 'alphabet',
  LENGTH = 'length',
}

const getPreparedGoods = (
  goods: string [],
  sortField: SortFields,
  reversed: boolean,
) => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortFields.ALPHABETICLY:
          return good1.localeCompare(good2);

        case SortFields.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortFields.DEFAULT);
  const [reversed, setReversed] = useState(false);

  const goods = getPreparedGoods(goodsFromServer, sortField, reversed);

  const reset = () => {
    setReversed(false);
    setSortField(SortFields.DEFAULT);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SortFields.ALPHABETICLY
              ? 'button is-info '
              : 'button is-info  is-light'
          }
          onClick={() => setSortField(SortFields.ALPHABETICLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SortFields.LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField(SortFields.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reversed
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
