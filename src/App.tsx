import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  BY_ALPHABET = 'alphabet',
  BY_LENGTH = 'length',
  SORT_DEFAULT = '',
}

function getPreparedGoods(
  goods : string[],
  sortField: SortType,
  isReversed: boolean,
) {
  const prepareGoods = [...goods];

  if (sortField) {
    prepareGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.BY_ALPHABET:
          return good1.localeCompare(good2);
        case SortType.BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.SORT_DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  const setToDefault = () => {
    setSortField(SortType.SORT_DEFAULT);
    setIsReversed(false);
  };

  const visibleGoods
    = getPreparedGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': !(sortField === SortType.BY_ALPHABET) })}
          onClick={() => setSortField(SortType.BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': !(sortField === SortType.BY_LENGTH) })}
          onClick={() => setSortField(SortType.BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn('button is-warning', {
              'is-light': !isReversed,
            })
          }
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {sortField || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={setToDefault}
          >
            Reset
          </button>
        ) : ''}

      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
