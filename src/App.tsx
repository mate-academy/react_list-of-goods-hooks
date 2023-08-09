import React, { useState } from 'react';
import cn from 'classnames';

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
  DEFAULT = '',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

interface FilterParams {
  sortField: SortType;
  sortReversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, sortReversed }: FilterParams,
) {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SortType.ALPHABET:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (sortReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.DEFAULT);
  const [sortReversed, setSortReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, sortReversed },
  );

  const reset = () => {
    setSortField(SortType.DEFAULT);
    setSortReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button', 'is-info',
            { 'is-light': sortField !== SortType.ALPHABET },
          )}
          onClick={() => setSortField(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button', 'is-success',
            { 'is-light': sortField !== SortType.LENGTH },
          )}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button', 'is-warning',
            { 'is-light': !sortReversed },
          )}
          onClick={() => setSortReversed(!sortReversed)}
        >
          Reverse
        </button>

        {(sortField || sortReversed) && (
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
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
