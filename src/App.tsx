import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  SORT_BY_ALPHABET = 'alphabet',
  SORT_BY_LENGTH = 'length',
  NO_SORT = '',
}

interface SortOptions {
  sortField: SortType;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed = false }: SortOptions,
): string[] {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SortType.SORT_BY_ALPHABET:
      preparedGoods.sort((goodA, goodB) => goodA.localeCompare(goodB));
      break;
    case SortType.SORT_BY_LENGTH:
      preparedGoods.sort((goodA, goodB) => goodA.length - goodB.length);
      break;
    default:
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.NO_SORT);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const reset = () => {
    setSortField(SortType.NO_SORT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
      <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.SORT_BY_ALPHABET,
          })}
          onClick={() => setSortField(SortType.SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {(sortField !== '' || isReversed) && (
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
      {visibleGoods.map((good, index) => {
          const uniqueKey = `${index}-${good}`;

          return (
            <li data-cy="Good" key={uniqueKey}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
