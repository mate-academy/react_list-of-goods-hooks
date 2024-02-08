import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { Good } from './types/good';
import { SortParams } from './types/SortParams';
import { SortTypes } from './types/SortTypes';

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

function getPreparedGoods(goods: Good[], { sortField, reversed }: SortParams) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortTypes.alphabet:
          return good1.localeCompare(good2);

        case SortTypes.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortTypes.none);
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, reversed },
  );
  const reset = () => {
    setSortField(SortTypes.none);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortTypes.alphabet)}
          type="button"
          className={`button is-info ${cn({ 'is-light': sortField !== SortTypes.alphabet })}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortTypes.length)}
          type="button"
          className={`button is-success ${cn({ 'is-light': sortField !== SortTypes.length })}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={`button is-warning ${cn({ 'is-light': reversed === false })}`}
        >
          Reverse
        </button>

        {(sortField !== SortTypes.none || reversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
